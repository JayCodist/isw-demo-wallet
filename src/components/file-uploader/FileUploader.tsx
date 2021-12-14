import {
  ChangeEventHandler,
  DragEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import LayoutContext from "../../context/layout-context";
import { imageExtensions } from "../../utils/constants";
import { resources } from "../../utils/resources";
import styles from "./FileUploader.module.scss";

interface FileUploaderProps {
  acceptedTypes: string[];
  titleText: string;
  subtitle?: string;
  onChange?: (file: File | null) => void;
  id?: string;
  imgSrc?: string;
  clear?: () => void;
  className?: string;
  file?: File | null;
}

const FileUploader: FunctionComponent<FileUploaderProps> = props => {
  const [dragHover, setDragHover] = useState(false);
  const [fileName, setFileName] = useState("");

  const {
    acceptedTypes,
    titleText,
    subtitle,
    onChange = () => {},
    id,
    imgSrc,
    clear = () => {},
    className,
    file
  } = props;
  const inputRef = useRef(null);
  const { notify } = useContext(LayoutContext);

  const handleValidation = (file: File | null) => {
    if (!acceptedTypes.length) {
      notify("error", "There are no valid file types for this input");
    }

    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      // Validation for images
      if (acceptedTypes.some(acceptedType => /image\/\*/.test(acceptedType))) {
        if (file.size > 2000000) {
          notify("error", "Please upload a file of size 2MB of lower");
          return;
        }
        if (!ext && !imageExtensions[ext as string]) {
          notify(
            "error",
            `Invalid image type. Valid types include ${Object.keys(
              imageExtensions
            ).join(", ")}`
          );
          return;
        }
      }

      // Validation for other types
      else if (
        !acceptedTypes.some(
          acceptedType => acceptedType.toLowerCase() === `.${ext}`
        )
      ) {
        notify(
          "error",
          `The file uploaded has invalid type. Please upload file of types: ${acceptedTypes.join(
            ", "
          )}`
        );
        return;
      }
    }

    setFileName(file?.name || "");
    onChange(file);
  };

  useEffect(() => {
    setFileName(file?.name || "");
  }, [file]);

  const onDrop: DragEventHandler = e => {
    e.stopPropagation();
    e.preventDefault();
    setDragHover(false);
    handleValidation(e.dataTransfer.files[0] || null);
  };

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = e => {
    setDragHover(false);
    handleValidation(e.target.files ? e.target.files[0] : null);
    e.target.value = "";
  };

  const handleClear: MouseEventHandler = e => {
    e.stopPropagation();
    e.preventDefault();
    clear();
    onChange(null);
    setFileName("");
  };

  const displayedContent =
    !fileName && imgSrc ? (
      <>
        <img src={imgSrc} alt="uploaded" className={styles.img} />
      </>
    ) : (
      <>
        <span className={styles.add}>{titleText || "Add images"}</span>
        <span className={styles.subtitle}>
          {subtitle || "Or drag image(s) to upload"}
        </span>
      </>
    );

  return (
    <label
      className={[
        styles.wrapper,
        dragHover && styles["drag-hover"],
        className
      ].join(" ")}
      onDrop={onDrop}
      onDragOver={e => e.preventDefault()}
      onDragEnter={() => setDragHover(true)}
      onDragLeave={() => setDragHover(false)}
    >
      <input
        type="file"
        accept={(acceptedTypes || []).join(",")}
        ref={inputRef}
        className={styles.input}
        onChange={handleFileUpload}
        id={id}
      />
      {(fileName || imgSrc) && (
        <img
          onClick={handleClear}
          src={resources.icons.COLOR_CANCEL}
          alt="clear"
          className={styles.clear}
        />
      )}
      {fileName ? (
        <strong className={styles["file-name"]}>{fileName}</strong>
      ) : (
        displayedContent
      )}
    </label>
  );
};

export default FileUploader;
