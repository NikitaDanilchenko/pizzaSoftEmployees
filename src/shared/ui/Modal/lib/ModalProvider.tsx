import { ReactNode } from "react";
import { ModalContext } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
  onClose: () => void;
}
export const ModalProvider: React.FC<ModalProviderProps> = ({ children, onClose }) => {
  return <ModalContext.Provider value={{ onClose }}>{children}</ModalContext.Provider>;
};
