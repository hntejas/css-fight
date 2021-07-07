import axios from "axios";
import { getAuthToken } from "../utils/helper";

export async function getUserFights() {
  try {
    const response = await axios.get(
      "https://css-fight-api.hntejas.repl.co/fight/",
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
    return {
      success: false,
      error: {
        message: "Something went wrong! Please try again",
      },
    };
  }
}

export async function saveCode({ fightId, fightCode }) {
  try {
    const response = await axios.post(
      "https://css-fight-api.hntejas.repl.co/fight/save",
      {
        fightId,
        fightCode,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export async function saveAndSubmit({
  targetImg,
  sourceImg,
  fightId,
  fightCode,
}) {
  try {
    const response = await axios.post(
      "https://css-fight-api.hntejas.repl.co/fight/submit",
      {
        targetImg,
        sourceImg,
        fightId,
        fightCode,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
    return {
      success: false,
      error: {
        message: "Something went wrong! Please try again",
      },
    };
  }
}
