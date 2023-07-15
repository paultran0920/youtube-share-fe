const ACCESS_TOKEN = 'access_token';
const REMEMBER_ME = 'remember_me';

export const loadAccessToken = () => {
  return (
    window.sessionStorage.getItem(ACCESS_TOKEN) ||
    window.localStorage.getItem(ACCESS_TOKEN)
  );
};

export const saveAccessToken = (newAccessToken: string) => {
  const rememberMe = loadRememberMe();
  if (rememberMe) {
    window.localStorage.setItem(ACCESS_TOKEN, newAccessToken);
    window.sessionStorage.removeItem(ACCESS_TOKEN);
  } else {
    window.sessionStorage.setItem(ACCESS_TOKEN, newAccessToken);
    window.localStorage.removeItem(ACCESS_TOKEN);
  }
};

export const deleteAccessToken = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.sessionStorage.removeItem(ACCESS_TOKEN);
};

export const replaceAccessToken = (newAccessToken: string) => {
  deleteAccessToken();
  saveAccessToken(newAccessToken);
};

export const loadRememberMe = () => {
  return !!window.localStorage.getItem(REMEMBER_ME);
};

export const saveRememberMe = (rememberMe: boolean) => {
  if (!rememberMe) {
    return deleteRememberMe();
  }
  window.localStorage.setItem(REMEMBER_ME, rememberMe + '');
};

export const deleteRememberMe = () => {
  window.localStorage.removeItem(REMEMBER_ME);
};
