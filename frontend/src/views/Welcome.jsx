import { Plus } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      {/* <div className='glass flex items-center p-10'>
              <div className='font-medium text-indigo-600 text-lg flex space-x-6 items-center'>
                  <div className='w-6 h-6 bg-indigo-600 rounded-full'></div>
                  <span>
                  Form Builder
                  </span>
              </div>
          </div> */}
      <div className='max-w-[94rem] mx-auto p-10 flex flex-col items-start space-y-10'>
        <div className='flex items-center justify-between w-full'>
          <div className='font-medium text-xl'>Welcome, Harry</div>
          <Link
            to='/create-form'
            className='p-3 px-4 bg-indigo-600 rounded-md flex items-center space-x-4 text-white font-medium'
          >
            <Plus weight='bold'></Plus>
            <span>Create New Form</span>
          </Link>
        </div>
        <div className='w-full flex items-center justify-center min-h-[24rem]'>
          <p className='font-medium opacity-50'>You currently have no forms</p>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
