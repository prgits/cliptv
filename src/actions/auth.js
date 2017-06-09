export const isLogin = () => {
  return (localStorage.getItem('is_login'))?true:false
};

export const logOut = (data) => {
  localStorage.removeItem('is_login');
  data.push('/home');
  return true
};
