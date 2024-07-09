import { useAuthContext } from "./useAuthContext";
import { useCollectionContext } from "./useCollectionContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: collectionDispatch } = useCollectionContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    collectionDispatch({ type: "SET_COLLECTION", payload: null });
  };
  return { logout };
};
