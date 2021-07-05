import { toast } from "react-toastify";

export function showToast(text) {
  toast.dark(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    style: { background: "#181818", minHeight: "2rem" },
  });
}

export const addTokenToStorage = (token) => {
  localStorage.setItem(
    "cssFightAuth",
    JSON.stringify({ isLoggedIn: true, token: token })
  );
};

export const isLoggedInLocally = () => {
  if (localStorage.getItem("cssFightAuth")) {
    return JSON.parse(localStorage.getItem("cssFightAuth"))["isLoggedIn"];
  }
};

export const getAuthToken = () =>
  localStorage.getItem("cssFightAuth") &&
  JSON.parse(localStorage.getItem("cssFightAuth"))["token"];
