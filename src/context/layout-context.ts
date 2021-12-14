import { createContext } from "react";

export interface ConfirmParams {
  title: string;
  body?: string;
  okText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onOk: () => void;
}

interface LayoutContextType {
  confirm: (confirmParams: ConfirmParams) => void;
  notify: (
    type: "success" | "error" | "info",
    message: string,
    duration?: number
  ) => void;
  setGlobalLoading: (globalLoadingState: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  confirm: () => {},
  notify: () => {},
  setGlobalLoading: () => {}
});

export default LayoutContext;
