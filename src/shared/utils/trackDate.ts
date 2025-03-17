import { type Track } from "@react-input/mask";

export const trackDate: Track = ({ inputType, data, value, selectionStart }): string | null => {
  if (!data || inputType !== "insert") {
    return data;
  }

  const v = parseInt(data, 10);

  if (selectionStart === 0) {
    if (v > 3) {
      return `0${v}`;
    }
  }

  if (selectionStart === 1) {
    if (value[0] === "3" && v > 1) {
      return null;
    }
  }

  if (selectionStart === 2) {
    if (v >= 2) {
      return `0${v}`;
    }
  }

  if (selectionStart === 4 && v > 2) {
    return "2";
  }

  if (selectionStart === 5) {
    if (v < 1 || v > 2) {
      return null;
    }
  }

  return data;
};
