import { toast, ToastOptions } from "react-toastify";

let options: ToastOptions<{}> = {
  position: toast.POSITION.BOTTOM_RIGHT,
  theme: "colored",
};

function success(message: string | JSX.Element) {
  toast.success(message, options);
}

function error(message: string | JSX.Element) {
  toast.error(message, options);
}

function info(message: string | JSX.Element) {
  toast.info(message, options);
}

function warn(message: string | JSX.Element) {
  toast.warn(message, options);
}

const Toast = {
  success,
  error,
  info,
  warn,
};

export default Toast;
