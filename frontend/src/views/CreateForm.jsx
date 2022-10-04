import { FloppyDisk } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

const CreateForm = () => {
  return (
    <main>
      <div className='max-w-[94rem] mx-auto p-10 flex flex-col items-start space-y-10'>
        <div className='flex items-center justify-between w-full'>
          <div className='font-medium text-xl'>Create a new form</div>
          <Link
            to='/create-form'
            className='p-3 px-4 bg-indigo-600 rounded-md flex items-center space-x-4 text-white font-medium'
          >
            <FloppyDisk weight='bold'></FloppyDisk>
            <span>Save</span>
          </Link>
        </div>
        <p>
          To create a new form, add a title and click{" "}
          <span className='font-medium'>Add Questions</span> to add questions to
          your form . Once saved a url will be generated that can be shared.
        </p>
        <div>
          <input
            type='text'
            placeholder='Title - Click to Edit'
            className='text-3xl py-4 outline-none'
          />
        </div>
        <div className='flex flex-col'></div>
      </div>
    </main>
  );
};

export default CreateForm;
