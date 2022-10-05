import { FloppyDisk, Plus, X } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Question from "../components/Question";
import { v4 as uuid } from "uuid";
import axios from "axios";

const CreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    caption: "",
    answerType: "TEXT",
    options: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    if (!title) {
      setError("Please Enter A Title");
      return;
    }

    axios
      .post(
        "/forms",
        { name: title, questions },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        navigate("/welcome", {
          replace: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          setError(err.response.data.status.replaceAll("_", " "));
        } else {
          setError("An error occurred, Please try again");
        }
      });
  };

  const handleChange = (e) => {
    const name = e.target.selectedIndex ? "answerType" : e.target.name;
    const value =
      e.target.name === "options"
        ? e.target.value.split(/\r?\n/)
        : e.target.value;
    setNewQuestion((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestions([...questions, newQuestion]);
    setIsModalOpen(false);
    setNewQuestion({
      id: uuid(),
      caption: "",
      answerType: "TEXT",
      options: [],
    });
  };
  return (
    <main>
      <div className='max-w-[90rem] mx-auto p-10 flex flex-col items-start space-y-10'>
        <div className='flex items-center justify-between w-full'>
          <div className='font-medium text-xl'>Create a new form</div>
          <button
            onClick={handleSave}
            className='p-3 px-4 bg-indigo-600 rounded-md flex items-center space-x-4 text-white font-medium'
          >
            <FloppyDisk weight='bold'></FloppyDisk>
            <span> {loading ? "Saving" : "Save"}</span>
          </button>
        </div>
        <p>
          To create a new form, add a title and click{" "}
          <span className='font-medium'>Insert Questions</span> to add questions
          to your form . Once saved a url will be generated that can be shared.
        </p>
        <div>
          <input
            type='text'
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Form Title - Click to Edit'
            className='text-3xl py-4 outline-none'
          />
          <p className='text-red-500 font-medium'>{error}</p>
        </div>
        <div className='flex flex-col space-y-4 w-full'>
          {questions.map((v, i) => {
            return <Question key={i} {...v} displayText={false} />;
          })}
        </div>
        <div>
          <div
            onClick={() => setIsModalOpen(true)}
            className='p-3 cursor-pointer px-4 bg-indigo-600 rounded-md flex items-center space-x-4 text-white font-medium'
          >
            <Plus weight='bold'></Plus>
            <span>Insert Question</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          <div
            onSubmit={handleSubmit}
            className='flex flex-col space-y-4 w-full'
          >
            <div className='flex items-center justify-between mb-6'>
              <h3 className='font-medium text-lg'>Add Question</h3>
              <span
                className='p-2 bg-indigo-50 rounded-full cursor-pointer'
                onClick={() => setIsModalOpen(false)}
              >
                <X />
              </span>
            </div>
            <div>
              <label
                htmlFor='title'
                className='text-sm font-medium text-indigo-900'
              >
                Question
              </label>
              <textarea
                name='caption'
                placeholder='Enter your question'
                className='p-4 mt-2 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400 resize-y w-full'
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col space-y-3 '>
              <label
                htmlFor='type'
                className='text-sm font-medium text-indigo-900'
              >
                Question Type
              </label>
              <select
                onChange={handleChange}
                name='answerType'
                id='type'
                className='p-4 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400 w-full'
              >
                <option value='TEXT'>Text</option>
                <option value='CHECKBOX'>Multi-Choice</option>
                <option value='RADIO'>Single-Select</option>
              </select>
              <div>
                {newQuestion.answerType !== "TEXT" && (
                  <div>
                    <label
                      htmlFor='options'
                      className='text-sm font-medium text-indigo-900'
                    >
                      Options
                    </label>
                    <textarea
                      id='options'
                      name='options'
                      placeholder='Enter options in separate lines'
                      className='p-4 mt-2 bg-indigo-50 rounded-md min-w-[24rem] outline-indigo-400 resize-y w-full'
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className='p-4 bg-indigo-600 text-white font-medium rounded-md min-w-[24rem] outline-indigo-400'
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default CreateForm;
