import {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  useMemo
} from "react";
import styles from "./Select.module.scss";
import Checkbox from "../checkbox/Checkbox";
import Button from "../button/Button";
import Input from "../input/Input";
import { ModalProps } from "../modal/Modal";
import { BooleanFilter } from "../../utils/helpers/types-helpers";

let timeRef: ReturnType<typeof setTimeout>;

export interface Option {
  label: string | number | JSX.Element;
  value: string | number;
}

type ValueType = string | number | string[] | number[];

type FollowUpType = {
  label: string;
  onConclude: (payload?: string | number) => void;
  FollowUpModal: FunctionComponent<ModalProps>;
  position?: "top" | "bottom";
};

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (selected: ValueType) => void;
  value: ValueType;
  theme?: "light" | "dark";
  responsive?: boolean;
  multiple?: boolean;
  followUp?: FollowUpType;
  className?: string;
  showSelectedCount?: boolean;
  dropdownOnTop?: boolean;
  allowClear?: boolean;
  startIcon?: string;
  keepDropdownOpen?: boolean;
  id?: string;
  size?: "default" | "small";
  /*
   * Add the following prop if you want an extra checkbox to select/unselect all options.
   * Works only when the `multiple` prop is present
   */
  selectAll?: boolean;
  disabled?: boolean;
  /*
   *  Add this function prop if you want to enable search in a select component
   */
  onSearch?: (params: { searchStr: string }) => void;
  onSelectionView?: (e: MouseEvent) => void;
}

const Select: FunctionComponent<SelectProps> = props => {
  const {
    options: _options,
    placeholder: _placeholder,
    onSelect = () => {},
    value,
    theme,
    responsive,
    multiple,
    followUp,
    selectAll,
    className,
    showSelectedCount,
    dropdownOnTop,
    disabled,
    allowClear,
    onSearch,
    startIcon,
    keepDropdownOpen,
    onSelectionView,
    size,
    id
  } = props;

  const [searchStr, setSearchStr] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMap, setSelectedMap] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [placeholder, setPlaceholder] = useState<Option | null>(null);
  const [displayValue, setDisplayValue] = useState<
    string | number | JSX.Element
  >("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLElement>(null);
  const { label, FollowUpModal, onConclude = () => {} } = followUp || {};

  const handleClose: EventListener = e => {
    const dropdown = selectRef.current as HTMLElement | null;
    let _showModal;
    setShowModal(current => {
      _showModal = current;
      return current;
    });
    if (!_showModal && (!dropdown || !dropdown.contains(e.target as Node))) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const newOptions = _options.slice();
    // Ensure already selected option(s) is always in the list of result regardless of search string
    const newOptionMap: any = newOptions.reduce(
      (map, { value }) => ({ ...map, [value]: true }),
      {}
    );
    // Avoid duplication though
    const currentSelected = options.filter(
      ({ value }) => selectedMap[String(value)] && !newOptionMap[String(value)]
    );

    setOptions([...currentSelected, ...newOptions]);
    if (_placeholder) {
      setPlaceholder({ value: "", label: _placeholder });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_options, _placeholder]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => window.removeEventListener("mousedown", handleClose);
  }, []);

  useEffect(() => {
    setIsSearching(false);
    const selected = options.filter(option =>
      multiple
        ? (value as any[]).includes(option.value)
        : value === option.value
    );
    const _selectedMap: any = selected.reduce(
      (map, item) => ({ ...map, [item.value]: true }),
      {}
    );
    setSelectedMap(_selectedMap);

    const _displayValue = multiple
      ? options
          .filter(option => _selectedMap[option.value])
          .map(option => option.label)
          .join(", ")
      : (options.find(option => option.value === value) || {}).label;
    setDisplayValue(_displayValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, value]);

  useEffect(() => {
    if (Object.entries(selectedMap).length === options.length) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [selectedMap, options]);

  useEffect(() => {
    if (onSearch) {
      clearTimeout(timeRef);
      timeRef = setTimeout(() => {
        onSearch({ searchStr });
        setIsSearching(true);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  const handleOptionClick = (option: Option, e: MouseEvent) => {
    onSelect(option.value);
    if (!keepDropdownOpen) {
      setShowDropdown(false);
    }
    if (showSearchInput && searchInputRef.current?.focus) {
      searchInputRef.current.focus();
    }
    e.stopPropagation();
  };

  const handleOptionClickMultiple = (checked: boolean, option: Option) => {
    const output: any[] = checked
      ? Array.from(new Set([...(value as any[]), option.value])) // To target ES5 typescript
      : (value as any[]).filter(_option => option.value !== _option);
    const _selectedMap = output.reduce(
      (map, item) => ({ ...map, [item]: true }),
      {}
    );
    setSelectedMap(_selectedMap);
    onSelect(output);
  };

  const handleSelectClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleModalOptionClick: MouseEventHandler = e => {
    setShowModal(true);
    e.stopPropagation();
  };

  const handleSelectAllMultipleOptions = () => {
    if (selectedAll) {
      setSelectedMap({});
      onSelect([]);
    } else {
      const initial: any = {};
      const initialArray: any[] = [];
      options.forEach(option => {
        initial[option.value] = true;
        initialArray.push(option.value);
      });
      setSelectedMap(initial);
      onSelect(initialArray);
    }
    setSelectedAll(prev => !prev);
  };

  const followUpOption = label && (
    <div
      className={[styles.option, styles["follow-up"]].join(" ")}
      onClick={handleModalOptionClick}
      role="button"
    >
      {label}
    </div>
  );

  const dismissModal = (payload?: Option) => {
    setShowModal(false);
    onConclude(payload?.value);
    setOptions([...options, payload].filter(BooleanFilter));
    setSearchStr("");
    if (payload) {
      setShowDropdown(false);
    }
  };

  const followUpModal = FollowUpModal && (
    <FollowUpModal
      size="small"
      visible={Boolean(showModal)}
      cancel={dismissModal}
    />
  );

  const handleClear: MouseEventHandler = e => {
    onSelect(multiple ? [] : "");
    e.stopPropagation();
  };

  const handleView = (e: MouseEvent) => {
    onSelectionView?.(e);
    e.stopPropagation();
  };

  const showSearchInput = onSearch && showDropdown;

  useEffect(() => {
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!showSearchInput && onSearch && !multiple) {
      const selectedOptionLabel = options.find(
        option => option.value === value
      )?.label;
      if (selectedOptionLabel && typeof selectedOptionLabel === "string") {
        setSearchStr(selectedOptionLabel);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearchInput, options]);

  const nonClearIcons = isSearching ? (
    <img
      alt="searching"
      src="/icons/loading-icon-dots.svg"
      className={styles.loading}
    />
  ) : (
    <svg
      className={`${styles.arrow} ${showDropdown && styles.active}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.29201 10.2929C8.1052 10.4818 8.00043 10.7368 8.00043 11.0024C8.00043 11.2681 8.1052 11.523 8.29201 11.7119L11.231 14.6769C11.449 14.8919 11.731 14.9989 12.01 14.9989C12.289 14.9989 12.566 14.8919 12.779 14.6769L15.709 11.7219C15.8956 11.5329 16.0002 11.278 16.0002 11.0124C16.0002 10.7469 15.8956 10.492 15.709 10.3029C15.6172 10.2098 15.5077 10.1358 15.387 10.0853C15.2664 10.0347 15.1368 10.0087 15.006 10.0087C14.8752 10.0087 14.7457 10.0347 14.625 10.0853C14.5043 10.1358 14.3948 10.2098 14.303 10.3029L12.005 12.6199L9.69801 10.2929C9.60597 10.2001 9.49646 10.1264 9.3758 10.0762C9.25514 10.0259 9.12572 10 8.99501 10C8.86429 10 8.73487 10.0259 8.61421 10.0762C8.49355 10.1264 8.38404 10.2001 8.29201 10.2929Z"
        fill="#091E42"
      />
    </svg>
  );

  const isValueSelected = useMemo(() => {
    return Object.keys(selectedMap).length > 0;
  }, [selectedMap]);

  return (
    <>
      <div
        className={[
          styles["select-wrapper"],
          showDropdown ? styles.active : "",
          styles[theme || "light"],
          responsive && styles.responsive,
          disabled && styles.disabled,
          styles[size || "default"],
          className
        ].join(" ")}
        onClick={handleSelectClick}
        ref={selectRef}
        role="list"
        id={id}
      >
        <div className={styles["main-content"]}>
          {startIcon && !displayValue && (
            <img
              alt="select"
              className={styles["start-icon"]}
              src={startIcon}
            />
          )}
          {showSearchInput && (
            <Input
              refValue={searchInputRef}
              placeholder={placeholder?.label as string}
              onChange={setSearchStr}
              value={searchStr}
              noBorder
              dimmed
              disabled={disabled}
              responsive
            />
          )}
          {!showSearchInput &&
            (displayValue ? (
              <span className={styles["main-text"]}>
                {showSelectedCount
                  ? `${Object.keys(selectedMap).length} Selected`
                  : displayValue}
              </span>
            ) : (
              <span className={styles.placeholder}>{placeholder?.label}</span>
            ))}
        </div>
        {onSelectionView && isValueSelected && (
          <Button
            type="transparent"
            onClick={handleView}
            iconOnly
            className={[styles.clear, styles.view].join(" ")}
          >
            <img
              className={styles.icon}
              alt="view"
              src="/icons/eye-solid.svg"
            />
          </Button>
        )}
        {allowClear
          ? Object.keys(selectedMap).length > 0 && (
              <Button
                iconOnly
                onClick={handleClear}
                className={styles.clear}
                type="transparent"
              >
                <img
                  alt="remove"
                  src="/icons/times-solid.svg"
                  className={styles.icon}
                />
              </Button>
            )
          : nonClearIcons}
        <div
          className={[
            styles.dropdown,
            showDropdown && styles["show-dropdown"],
            dropdownOnTop && styles["on-top"]
          ].join(" ")}
        >
          {multiple && selectAll && (
            <div className={`${styles.option} ${styles.active}`}>
              <Checkbox
                checked={selectedAll}
                text="Select All"
                responsive
                onChange={handleSelectAllMultipleOptions}
              />
            </div>
          )}
          {followUp?.position === "top" && followUpOption}
          {[
            !multiple && !allowClear && !onSearch && placeholder,
            ...options
          ].map(
            (option, i) =>
              option && (
                <div
                  className={`${styles.option} ${
                    !option.value && styles.initial
                  } ${option.value === value && styles.active}`}
                  role="listitem"
                  key={i}
                  onClick={
                    multiple
                      ? e => e.stopPropagation()
                      : e => handleOptionClick(option, e)
                  }
                >
                  {multiple ? (
                    <Checkbox
                      checked={Boolean(selectedMap[option.value])}
                      text={option.label}
                      responsive
                      onChange={checked =>
                        handleOptionClickMultiple(checked, option)
                      }
                    />
                  ) : (
                    option.label
                  )}
                </div>
              )
          )}
          {followUp?.position !== "top" && followUpOption}
        </div>
      </div>
      {followUpModal}
    </>
  );
};

export default Select;
