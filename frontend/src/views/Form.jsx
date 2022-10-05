import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../components/Question";

const Form = () => {
  const { slug } = useParams();
  const [form, setFormData] = useState({
    questions: [],
  });
  const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    axios.get(`/forms/${slug}`).then((res) => {
      if (res.data.success === true) {
        setFormData(res.data.data[0]);
      }
    });
  }, [slug]);

  const handleChange = (e) => {
    const questionId = e.target.name;
    let value;

    if (!e.target.id && !e.target.checked) {
      value = [e.target.value];
    }

    if (e.target.value === "on") {
      value = [];
      e.target.checked ? value.push(e.target.id) : value.pop();
    }

    setAnswer({ ...answer, [questionId]: { questionId, value } });
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");

    setLoading(true);

    axios
      .post(
        "/forms/responses",
        { formId: form.formId, answers: Object.values(answer) },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setSubmit(true);
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

  return (
    <main>
      {submit ? (
        <div className='mt-10'>
          <h1 className='text-center text-5xl font-bold text-indigo-600'>
            Thank you
          </h1>
        </div>
      ) : (
        <div className='max-w-[90rem] mx-auto p-10 flex flex-col items-start space-y-10'>
          <div className='flex items-center justify-between w-full'>
            <div className='font-medium text-3xl'>{form.name}</div>
          </div>
          <div className='flex flex-col space-y-4 w-full'>
            {form.questions.map((v, i) => {
              return (
                <Question
                  key={i}
                  {...v}
                  handleValue={handleChange}
                  serverId={v._id}
                />
              );
            })}
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className='p-3 cursor-pointer px-4 bg-indigo-600 rounded-md flex items-center space-x-4 text-white font-medium'
            >
              <span>{loading ? "Sending" : "Submit"}</span>
            </button>
            <p className='text-red-500 font-medium'>{error}</p>
          </div>
        </div>
      )}
    </main>
  );
};
export default Form;
