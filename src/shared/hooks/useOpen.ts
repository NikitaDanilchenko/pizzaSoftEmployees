import { useState } from "react";

export const useOpen = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = (): void => {
    setIsOpen(false);
  };
  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleCloseOpen = (): void => {
    setIsOpen(prev => !prev);
  };

  return { isOpen, handleOpen, handleClose, handleCloseOpen };
};
