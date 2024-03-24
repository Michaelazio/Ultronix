import { useState, createContext, useContext} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setToken, deleteToken } from "../Redux/authSlice";
import { useUserLoginMutation} from "../Redux/api";
export let AuthContext = createContext(null);

export const AuthenticationService = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()


  const userlogin = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const userData = await useUserLoginMutation({ email, password });
      if (userData) {
        setIsLoading(false);
        const user = userData.json();
        setUserDetails(user);
        console.log(user.token)
        dispatch(setToken(user.token))
      }
      console.log(userDetails);
      return userDetails;
    } catch (error) {
      throw error;
    }
  };

  const userLogout = () =>{
    setUserDetails(null);
    dispatch(deleteToken())
    return userDetails
  } 

  return (
    <AuthContext.Provider value={{ userDetails, userlogin, userLogout, isLoading }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
