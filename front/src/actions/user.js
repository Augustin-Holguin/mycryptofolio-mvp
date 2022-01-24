export const CHANGE_FIELD = 'CHANGE_FIELD';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const LOGOUT = 'LOGOUT';
export const CHECK_TOKEN = 'CHECK_TOKEN';

export const changeField = (key, value) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value,
  },
});

export const login = () => ({
  type: LOGIN,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: { ...user },
});

export const logout = () => ({
  type: LOGOUT,
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
});
