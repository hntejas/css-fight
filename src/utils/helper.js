import { toast } from "react-toastify";

export function showToast(text) {
  toast.dark(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    style: { background: "#181818", minHeight: "2rem" },
  });
}
