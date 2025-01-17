import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, WindowLocation } from "@reach/router";
import styles from "./Layout.module.scss";
import LayoutContext, { ConfirmParams } from "../../context/layout-context";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import useInterval from "../../utils/hooks/useInterval";
import { links } from "../../utils/constants";
import { resources } from "../../utils/resources";
import UserContext from "../../context/user-context";

const toasterDuration = {
  success: 2000,
  info: 4000,
  error: 5000
};
let toasterTimer: ReturnType<typeof setTimeout>;

const getNextPercentage = (current: number) => {
  if (current < 20) {
    return current + 2;
  }
  if (current < 40) {
    return current + 1;
  }
  if (current < 50) {
    return current + 0.5;
  }
  if (current < 80) {
    return current + 0.2;
  }
  if (current < 90) {
    return current + 0.1;
  }

  return current;
};

const initialConfirmParams: ConfirmParams = {
  title: "Are you sure?",
  body: "This cannot be reversed",
  onCancel: () => {},
  onOk: () => {},
  okText: "Yes",
  cancelText: "No"
};

const initialToasterParams: ToasterParams = {
  type: "info",
  message: "Done"
};

type LayoutProps = {
  children: React.ReactNode;
  location: WindowLocation;
};

const AppLayout: FunctionComponent<LayoutProps> = props => {
  const [collapsed, setCollapsed] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmParams, setConfirmParams] = useState(initialConfirmParams);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterParams, setToasterParams] = useState(initialToasterParams);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [globalLoading, setGlobalLoading] = useState(false);

  const { children, location } = props;
  const route = location.pathname;

  const mainRoute = `/${route.split("/")[1]}`;
  const currentSubLinks: { url: string; title: string }[] =
    links[mainRoute]?.children || [];

  const confirm = (params: ConfirmParams) => {
    setConfirmParams(params);
    setShowConfirm(true);
  };

  const dismissConfirm = () => {
    setShowConfirm(false);
    setConfirmParams(initialConfirmParams);
  };

  const dismissToaster = () => {
    setShowToaster(false);
  };

  const notify = (
    type: "success" | "error" | "info",
    message: string,
    duration?: number
  ) => {
    setShowToaster(false);
    clearTimeout(toasterTimer);
    const displayToaster = () => {
      setToasterParams({ type, message });
      setShowToaster(true);

      toasterTimer = setTimeout(() => {
        setShowToaster(false);
      }, duration || toasterDuration[type]);
    };

    setTimeout(() => displayToaster(), 300);
  };

  const contextValue = {
    confirm,
    notify,
    setGlobalLoading
  };

  useInterval(
    () => setLoadingPercentage(current => getNextPercentage(current)),
    globalLoading ? 200 : null
  );

  useEffect(() => {
    if (globalLoading) {
      setLoadingPercentage(0);
    }
  }, [globalLoading]);

  return (
    <LayoutContext.Provider value={contextValue}>
      <section
        className={[styles.container, collapsed && styles.collapsed].join(" ")}
      >
        <div className={styles["navbar-wrapper"]}>
          <nav
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            className={[
              styles["main-navbar"],
              collapsed ? styles.collapsed : ""
            ].join(" ")}
          >
            <h1 className={styles.logo}>QuickWallet</h1>
            {Object.keys(links).map(key => (
              <Link
                to={links[key].url}
                key={links[key].url}
                className={[
                  styles["main-link"],
                  links[key].url.startsWith(mainRoute) ? styles.active : ""
                ].join(" ")}
              >
                {links[key].icon}
                <span className={styles.text}>{links[key].title}</span>
              </Link>
            ))}
          </nav>
          <nav className={styles["sub-navbar"]}>
            {currentSubLinks.map(link => (
              <Link
                key={link.url}
                to={link.url}
                className={[
                  styles["sub-link"],
                  route.startsWith(link.url) ? styles.active : ""
                ].join(" ")}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <section
          className={[styles.right, collapsed ? styles.collapsed : ""].join(
            " "
          )}
        >
          <header className={styles.header}>
            <div className={styles["bell-wrapper"]}>
              <img
                alt="notification"
                src="/icons/bell-icon.svg"
                className={styles["bell-icon"]}
              />
              <span className={styles.dot} />
            </div>
            <UserArea />
          </header>
          <div className={styles["content-wrapper"]}>{children}</div>
          {globalLoading && (
            <div className={styles["loading-backdrop"]}>
              <div className={styles["percent-wrapper"]}>
                <div
                  className={styles.percent}
                  style={{ width: `${loadingPercentage}%` }}
                />
              </div>
              <img
                alt="loading"
                src="/images/animation-img.svg"
                className={styles["loading-img"]}
              />
            </div>
          )}
        </section>
      </section>
      <ConfirmModal
        visible={showConfirm}
        confirmParams={confirmParams}
        cancel={dismissConfirm}
      />
      <Toaster
        visible={showToaster}
        toasterParams={toasterParams}
        cancel={dismissToaster}
      />
    </LayoutContext.Provider>
  );
};

type ToasterParams = {
  type: "success" | "error" | "info";
  message: string;
};

type ToasterProps = {
  visible: boolean;
  cancel: () => void;
  toasterParams: ToasterParams;
};

const Toaster = (props: ToasterProps) => {
  const { visible, toasterParams, cancel } = props;
  const { type, message } = toasterParams;

  const iconsMap = {
    success: resources.icons.CHECK_SOLID,
    error: resources.icons.TIMES_SOLID,
    info: resources.icons.INFO_SOLID
  };

  return (
    <div
      className={[styles.toaster, styles[type], visible && styles.active].join(
        " "
      )}
      id="toastContainer"
    >
      <div className={styles["icon-wrapper"]}>
        <img alt="notify" className={styles.icon} src={iconsMap[type]} />
      </div>
      <span id="toastMessage" className={[styles.message].join(" ")}>
        {message}
      </span>
      <div onClick={cancel} className={styles["close-icon"]} role="button">
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </div>
  );
};

type ConfirmModalProps = {
  visible: boolean;
  cancel: () => void;
  confirmParams: ConfirmParams;
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const [loading, setLoading] = useState(false);

  const { visible, cancel, confirmParams } = props;
  const {
    okText = "Yes",
    cancelText = "No",
    onOk = () => {},
    onCancel = () => {},
    title = "Are you sure?",
    body = "This action is irreversible"
  } = confirmParams;

  const handleClick = async () => {
    setLoading(true);
    try {
      await onOk();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    cancel();
  };

  const handleCancel = () => {
    onCancel();
    cancel();
  };

  return (
    <Modal visible={visible} isConfirm>
      <h2 className={styles["confirm-title"]}>{title}</h2>
      <p className={styles["confirm-body"]}>{body}</p>
      <div className="flex vertical-margin end">
        <Button type="accent" onClick={handleCancel} id="confirmCancelButton">
          {cancelText}
        </Button>
        <Button
          loading={loading}
          type="primary"
          onClick={handleClick}
          className="margin-left spaced"
          id="confirmOKButton"
        >
          {okText}
        </Button>
      </div>
    </Modal>
  );
};

const UserArea: FunctionComponent = () => {
  const user = useContext(UserContext);

  // const handleLogout = async () => {
  //   AppStorage.remove("WALLET_SAVED_USER");
  //   setUser(null);
  //   router.push("/public/auth/login");
  // };

  return (
    <div className={styles["user-area"]}>
      <div className={styles["link-item"]}>
        <img
          src="/icons/referrals.svg"
          alt="referrals"
          className={styles.icon}
        />
        <span className={styles["link-title"]}>Referrals</span>
      </div>
      <div className={styles["link-item"]}>
        <img src="/icons/demo-user.svg" alt="user" className={styles.icon} />
        <span className={styles["link-title"]}>
          Hi, {user?.firstName || "There"}
        </span>
      </div>
    </div>
  );
};

export default AppLayout;
