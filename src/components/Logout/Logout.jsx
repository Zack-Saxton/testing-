
export default function Logout() {

  // const [logg, setLogg] = useLocalStorage("isLoggedIn", "");
  localStorage.setItem('isLoggedIn', '');

};

