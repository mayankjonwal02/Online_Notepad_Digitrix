import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";


const Defaultscreen = () => {
  const navigate = useNavigate();
//   const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    
    // if (localStorage.getItem("islogined") === "true") {
    //   navigate("/docs");
    // } else {
    //   navigate("/noaccountdoc")

    // }

    navigate("/noaccountdoc")
  }, []);



  return (
    <div></div>
  );
};

export default Defaultscreen;
