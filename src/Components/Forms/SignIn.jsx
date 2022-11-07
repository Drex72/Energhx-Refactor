import { createContext, useContext, useEffect, useState } from "react";
import UserLogInCompLarge from ".././src/UserStuff/UserLoginCompLarge";
import Header from "../../Components/Header/Header";
import UserLogInCompSmall from ".././src/UserStuff/UserLoginInCompSmall";
import { userLoginContext } from ".././../Data/data";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserDashboardContext = createContext();


export let loginToken;

export function UserDashboardContextProvider({ children }) {
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("userState"))
  );

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  const [auth, setAuth] = useState(true);
  const [formError, setFormError] = useState('')

  useEffect(() => {
    localStorage.setItem("adminState", userLoginContext?.storage_object);
  }, []);

  return (
    <UserDashboardContext.Provider value={{ data, setData, userInfo, setUserInfo, setAuth, auth, formError, setFormError }}>
      {children}
    </UserDashboardContext.Provider>
  );
}

function UserLoginForm() {
  return (
    <UserDashboardContextProvider>
      <UserLogInFormHelper />
    </UserDashboardContextProvider>
  );
}

function UserLogInFormHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, setUserInfo, userInfo, auth, setAuth, setFormError, formError } = useContext(UserDashboardContext);
  
  const navigate = useNavigate();



  
  useEffect(() => {
    // console.log(data);
  }, []);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const options = {
      url: "https://energyhx-2.herokuapp.com/api/v1/auth/users/login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    };

    axios(options)
      .then((response) => {
        // console.log(data);
        const responseValues = response?.data;
        setUserInfo(responseValues);
        console.log(response);
        // delete responseValues.token;
        loginToken = responseValues.token;
        localStorage.setItem("BearerToken", responseValues.token);
        localStorage.setItem("data", JSON.stringify(responseValues));
        // console.log(auth)
        console.log(setAuth(true));
        navigate("/user-dashboard");
        // console.log(response)
      })
      .catch((err) => {
        console.log(err?.message);
        setFormError(err.response.data.message)
        
      });
  };

  return (
    <div className="bg-[#f3eded] min-h-screen">
      <div className="page-header bg-[#000000] text-[#fff]">
        <Header onOpen={handleIsOpen} isOpen={isOpen} />
      </div>
      <UserLogInCompSmall
        AdminData={data}
        setAdminData={setData}
        sendData={sendData}
        formError={formError}
      />
      <UserLogInCompLarge
        AdminData={data}
        setAdminData={setData}
        sendData={sendData}
        formError={formError}
      />
    </div>
  );
}

export default UserLoginForm;

