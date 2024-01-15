import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";


const Defaultscreen = () => {
  const navigate = useNavigate();
//   const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    
    if (localStorage.getItem("islogined") === "true") {
      navigate("/docs");
    } else {
      navigate("/login");

    }
  }, []);



  return (
    <div></div>
  );
};

export default Defaultscreen;
