import React from "react";
import BrandLogo from "../components/BrandLogo";
import logo from "../assets/logo.png";

function Welcome()  {

    return (
       <>
        <div className="flex bg-green-100 h-screen">
                <div className="ml-64 mt-64 text-2xl">
                    Welcome to <span className="text-green-400 font-bold">Management </span>of
                    <img src={logo} width={"50%"} alt="logo" />
                </div>
        </div>
       </>
    )
}

export default Welcome;