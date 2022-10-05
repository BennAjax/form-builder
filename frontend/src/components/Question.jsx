import React from "react";

const Question = ({
  id,
  answerType,
  caption,
  options,
  displayText = true,
  handleValue,
  serverId,
}) => {
  return (
    <div className='bg-indigo-50 p-4 rounded-md w-full'>
      <div className='p-4 font-small text-xl'>{caption}</div>
      {answerType === "TEXT" && displayText && (
        <input
          type='text'
          name={serverId}
          onChange={handleValue}
          className='p-4 bg-transparent outline-none'
          placeholder='Enter your answer'
        />
      )}
      {options.length > 0 && (
        <div className='p-4 flex flex-col space-y-4'>
          {options.map((option, i) => {
            return (
              <div key={i} className='flex items-center space-x-2'>
                <input
                  onChange={handleValue}
                  type={answerType === "CHECKBOX" ? "checkbox" : "radio"}
                  name={!displayText ? answerType : serverId}
                  id={option.toLowerCase()}
                  className='accent-indigo-600'
                />
                <label htmlFor={id}>{option}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Question;
