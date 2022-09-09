import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function loginUser(event) {
    event.preventDefault();
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var newuser = {
      name: name,
    };
    users.push(newuser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Login is succesfull");
    navigate("/home");
  }

  return (
    <section className="min-h-screen relative py-12 2xl:py-20 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center -mx-4">
            <div className="w-full lg:w-2/5 px-4">
              <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white shadow-lg rounded-lg">
                <form onSubmit={loginUser}>
                  <h3 className="mb-8 text-2xl text-center font-bold font-heading">
                    Login to your Account
                  </h3>
                  <p className="mb-6 text-lg text-center font-heading">You can enter random username.</p>
                  <div className="flex items-center pl-6 mb-3 border border-gray-50 bg-white rounded-full">
                    <input
                      className="w-full shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-6 text-grey-darker"
                      type="text"
                      placeholder="Enter User Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out "
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
