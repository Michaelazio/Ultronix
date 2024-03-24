import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserOut, deleteUserImage } from "../../../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   useEffect(() => {
    dispatch(setUserOut())
    dispatch(deleteUserImage())
    navigate("/")
  }, [dispatch, navigate])
  return null
}

export default Logout