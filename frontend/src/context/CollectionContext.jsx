import { createContext, useReducer } from "react";

export const CollectionContext = createContext();

const collectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLLECTION":
      return {
        collections: action.payload,
      };
    case "CREATE_COLLECTION":
      return {
        collections: [action.payload, ...state.collections],
      };
    case "DELETE_COLLECTION":
      return {
        collections: state.collections.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const CollectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionReducer, {
    collections: null,
  });

  return (
    <CollectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollectionContext.Provider>
  );
};
