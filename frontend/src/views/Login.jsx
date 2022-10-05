import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      axios
        .post("/user/login", credentials)
        .then((res) => {
          setLoading(false);
          if (res.data.success === true) {
            localStorage.setItem("token", res.data.token);
            navigate("/welcome", {
              replace: true,
            });
          } else {
            setError(res.data.status);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            setError(err.response.data.status.replaceAll("_", " "));
          } else {
            setError("An error occurred, Please try again");
          }
        });
    },
    [credentials, navigate]
  );
  return (
    <div className='grid grid-cols-2 w-screen h-screen'>
      <div className='flex justify-center items-center bg-indigo-600 col-span-1'>
        <h1 className='text-white text-5xl font-extrabold text-center relative'>
          Form Builder
          <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
            <span
              className='
                    animate-ping
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-yellow-400
                    opacity-75
                  '
            ></span>
            <span
              className='
                    relative
                    inline-flex
                    rounded-full
                    h-3
                    w-3
                    bg-yellow-500
                  '
            ></span>
          </span>
        </h1>
      </div>
      <div className='col-span-1 flex items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center space-y-6'
        >
          <div className='flex flex-col items-center justify-center space-y-4'>
            <h1 className='text-3xl font-bold smm:text-4xl'>Hello again!</h1>
            <p>Login now to access your forms.</p>
          </div>
          <div className='flex flex-col space-y-2'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              id='email'
              disabled={loading}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className='p-4 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400 disabled:opacity-90 disabled:cursor-not-allowed'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              id='password'
              disabled={loading}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className='p-4 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400 disabled:opacity-90 disabled:cursor-not-allowed'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <button
              disabled={loading}
              type='submit'
              className='p-4 bg-indigo-600 text-white font-medium rounded-md min-w-[24rem] outline-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {loading ? "Logging you in" : "Login"}
            </button>
            <p className='text-red-500 text-center font-medium'>{error}</p>
          </div>
          <div className='flex flex-col space-y-2 items-center'>
            <p>Don't have an account?</p>
            <Link to='/create-account' className='text-indigo-600 font-medium'>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
