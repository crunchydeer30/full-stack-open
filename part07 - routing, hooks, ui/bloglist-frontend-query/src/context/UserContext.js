import { createContext, useReducer, useContext } from 'react';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

export const useSetUser = () => {
  const valueAndDispatch = useContext(UserContext);
  const dispatch = valueAndDispatch[1];
  return (payload) => {
    dispatch({ type: 'SET_USER', payload: payload });
  };
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
