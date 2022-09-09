import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api/baseUrl";

const EditPage = () => {
  const [content, setContent] = useState("");
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const editData = () => {
    const data = {
      content: content,
    };

    axios
      .put(`${baseUrl}/${id}`, data)
      .then((res) => {
        setData(res.data);
        setContent("");
      })
      .catch((err) => {});

    navigate("/home");
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-8">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest text-center text-lg font-bold">
            Update Content
          </h1>
          <form className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="New Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={3}
            />
            <button
              onClick={editData}
              className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
