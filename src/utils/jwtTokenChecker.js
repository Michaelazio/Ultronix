import  {jwtDecode}  from "jwt-decode";
import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setUserOut } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

export const TokenCheckingCTX = createContext(null);

export const TokenValidator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const jwtTokenChecker = () => {
    if (token) {
      const decodedTokenExpTime = jwtDecode(token).exp;
      const currentTimeInSeconds = Date.now() / 1000;
      if (decodedTokenExpTime < currentTimeInSeconds) {
        dispatch(setUserOut());
        navigate("/");
      }
    } else {
      dispatch(setUserOut());
      navigate("/");
    }
  };

  return (
    <TokenCheckingCTX.Provider value={{jwtTokenChecker}}>
      <Outlet/>
    </TokenCheckingCTX.Provider>
  );
}

export const useJwtTokenChecker =() =>{
    return useContext(TokenCheckingCTX);
};
