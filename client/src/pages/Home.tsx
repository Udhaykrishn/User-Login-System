import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();


  const checkToken = ()=>{
    const cookies = new Cookies();
    const token = cookies.get('token');
    if(token){
      navigate("/dashboard")
    }
  }

  useEffect(()=>{
    checkToken();
  },[])
  return (
    <>
      Home
    </>
  )
}

export default Home