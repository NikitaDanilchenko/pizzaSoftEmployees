import { useClickOutside } from "@shared/hooks/useClickOutside";
import { ReactNode } from "react";
import CloseIcon from "@shared/assets/images/Close.svg?react";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "./lib/ModalProvider";
import { ReactPortal } from "../Portal/ReactPortal";
import style from "./modal.module.scss";

interface ModalProps {
  children: ReactNode;
  isOpen?: boolean | undefined;
  onClose: (() => void) | undefined;
  title: string;
}

export const Modal = (props: ModalProps) => {
  const { children, onClose, title, isOpen } = props;
  const navigate = useNavigate();
  const handleClose = (): void => {
    if (isOpen !== undefined) {
      onClose?.();
    }
    navigate(-1);
  };

  const ref = useClickOutside<HTMLDivElement>(handleClose);

  return (
    <>
      <div>
        <ModalProvider onClose={handleClose}>
          <ReactPortal wrapperId="modalContainer">
            <div className={style.modal}>
              <div className={style.modalContainer}>
                <div className={style.modalWrapper} ref={ref}>
                  <div className={style.modalHeader}>
                    <span>{title}</span>
                    <CloseIcon className={style.modalCloseIcon} onClick={handleClose} />
                  </div>
                  <div className={style.modalContentContainer}>{children}</div>
                </div>
              </div>
            </div>
          </ReactPortal>
        </ModalProvider>
      </div>
    </>
  );
};
