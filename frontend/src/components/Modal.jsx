import React from "react";

const Modal = ({ children }) => {
  return (
    <div className='w-screen h-screen fixed top-0 modal'>
      <div className='backdrop absolute top-0 w-full h-full'></div>
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-md p-10 min-w-[32rem] max-w-[32rem]'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
