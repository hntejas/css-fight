import { useState, useEffect } from "react";
import { useUser } from "../store/user";
import { getUserFights } from "../services/fight.service";

export const useAppLoader = () => {
  const { user, userDispatch, userActionTypes } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    if (user.isLoggedIn) {
      const response = await getUserFights();
      userDispatch({
        type: userActionTypes.SYNC_USER_FIGHTS,
        payload: {
          userFights: response.fights,
        },
      });
      setIsLoading(false);
    } else {
      userDispatch({
        type: userActionTypes.UPDATE_USER_LOGIN,
        payload: {
          isLoggedIn: false,
        },
      });
      setIsLoading(false);
    }
  }, [user.isLoggedIn]);

  return { isLoading };
};
