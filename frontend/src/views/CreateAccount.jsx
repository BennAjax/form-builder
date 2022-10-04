import React from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className='grid grid-cols-2 w-screen h-screen'>
      <div className='bg-indigo-600 col-span-1'></div>
      <div className='col-span-1 flex items-center justify-center'>
        <form className='flex flex-col items-center space-y-6'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <h1 className='text-3xl font-bold smm:text-4xl'>
              Welcome to Form Builder!
            </h1>
            <p>
              The fastest way to build your online forms. Let's get you started
            </p>
          </div>
          <div className='flex flex-col space-y-2'>
            <input
              type='text'
              placeholder='Your name'
              name='fullname'
              id='fullname'
              className='p-4 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <input
              type='password'
              placeholder='Email Address'
              name='email'
              id='email'
              className='p-4 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <input
              type='password'
              placeholder='Password'
              name='email'
              id='email'
              className='p-4 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <button className='p-4 bg-indigo-600 text-white font-medium rounded-md min-w-[24rem]'>
              Create Account
            </button>
          </div>
          <div className='flex flex-col space-y-2 items-center'>
            <p>Already have an account?</p>
            <Link to='/' className='text-indigo-600 font-medium'>
              Log-in instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
