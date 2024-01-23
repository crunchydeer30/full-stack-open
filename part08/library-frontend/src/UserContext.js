import { createContext, useContext, useReducer } from 'react';
import storageService from './services/storage';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export const useSetUser = () => {
  const [, dispatch] = useContext(UserContext);
  return (payload) => {
    dispatch({ type: 'SET', payload });
    storageService.saveUser(payload);
  };
};

export const useInitUser = () => {
  const [, dispatch] = useContext(UserContext);

  return async () => {
    const user = await storageService.loadUser();
    if (user) {
      dispatch({ type: 'SET', payload: user });
    }
  };
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
