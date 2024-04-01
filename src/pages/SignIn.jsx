import loginImg from "../assets/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import BrandLogo from "../components/BrandLogo";
import axiosInstance from "../utils/axiosHelper";
import useAuth from "../hooks/useAuth";

const SignIn = () => {  
  const navigate = useNavigate();
  const lState = useAuth();

  if(lState.loggedIn){
    navigate("/");
    return <></>
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleusernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post("/auth/login", {
        username,
        password,
        role: "string",
      })
      .then((response) => {
        const accessToken = response.data.accessToken;
        sessionStorage.setItem("access_token", accessToken);
        console.log("Stored token on local Storage as access_token");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError("Your username or Password is Incorrect");
        console.log(error);
      });
  }

  return (
    <>
      <div className="flex">
        <div className="w-full flex flex-col ">
          <div className="absolute bg-white/95  lg:w-1/2 w-full p-10">
            <BrandLogo />
          </div>
          <div className="flex justify-center items-center h-screen w-full">
            <div className="lg:w-[500px] sm:w-[600px]">
              <div>
                <div className="text-2xl font-bold">Log in</div>
                <div className={` pb-2`}>
                  Enter your username and password to login to the system
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex max-w-md flex-col gap-4"
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="username1" value="Your username" />
                  </div>
                  <TextInput
                    id="username1"
                    required
                    type="username"
                    onChange={handleusernameChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password" />
                  </div>
                  <TextInput
                    id="password1"
                    required
                    type="password"
                    onChange={handlePasswordChange}
                  />
                </div>
                {error ? (
                  <div className="text-red-500 font-semibold text-xs">
                    {" "}
                    {error}{" "}
                  </div>
                ) : (
                  ""
                )}
                <Button type="submit" color="primary">
                  {!loading ? (
                    "Login"
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 animate-spin"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                      />
                    </svg>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:block h-screen">
          <img
            src={loginImg}
            alt="login image"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
