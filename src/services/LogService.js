import { showMessage } from "react-native-flash-message";

export default {
  showSuccessMessage(message) {
    showMessage({
      message: message,
      type: "success",
    });
  },
  showInfoMessage(message) {
    showMessage({
      message: message,
      type: "info",
    });
  },
  showWarningMessage(message) {
    showMessage({
      message: message,
      type: "warning",
    });
  },
  showErrorMessage(message) {
    showMessage({
      message: message,
      type: "danger",
    });
  },
};
