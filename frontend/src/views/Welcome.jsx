import axios from "axios";
import { Plus } from "phosphor-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/forms", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
            setForms(res.data.data);
          }
        });
    } else {
      navigate("/", {
        replace: true,
      });
    }
  }, [navigate]);

  return (
    <main>
      <div className='max-w-[90rem] mx-auto p-10 flex flex-col items-start space-y-10'>
        <div className='flex items-center justify-items-start justify-between w-full'>
          <div className='font-medium text-xl'>Welcome</div>
          <Link
            to='/create-form'
            className='p-3 px-4 bg-indigo-600 rounded-md flex items-center space-x-4 text-white font-medium'
          >
            <Plus weight='bold'></Plus>
            <span>Create New Form</span>
          </Link>
        </div>

        <div className='flex justify-items-start flex-wrap mx-auto'>
          {forms.length > 0 ? (
            forms.map((form, i) => (
              <Link
                key={i}
                to={`/form/${form.slug}`}
                className='block m-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100'
              >
                <div>
                  <h1 className='text-sm'>
                    <span className='text-indigo-600 font-medium'>
                      Name: &nbsp;
                    </span>
                    {form.name}
                  </h1>
                  <p>
                    <span className='text-indigo-600 font-medium'>
                      Url: &nbsp;
                    </span>
                    {`${window.location.protocol}/${window.location.hostname}/form/${form.slug}`}
                  </p>
                  <p>
                    <span className='text-indigo-600 font-medium'>
                      TotalResponses: &nbsp;
                    </span>
                    {form.totalResponses}
                  </p>
                  <p>
                    <span className='text-indigo-600 font-medium'>
                      CreatedAt: &nbsp;
                    </span>
                    {new Date(form.createdAt).toLocaleTimeString("en-US")}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className='w-full flex items-center justify-center min-h-[24rem]'>
              <p className='text-center text-2xl font-medium opacity-50'>
                You currently have no forms
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Welcome;
