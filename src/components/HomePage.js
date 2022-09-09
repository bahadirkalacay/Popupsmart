import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../api/baseUrl";
import { Link } from "react-router-dom";
import cx from "classnames";

const fetchTodos = async () => {
  const { data } = await axios.get(`${baseUrl}`);
  return data;
};

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [content, setContent] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos().then((data) => {
      setItems(data);
    });
  }, []);

  const handleSubmit = () => {
    const data = {
      content: content,
    };
    if (content.length < 3) {
      return;
    }
    axios
      .post(`${baseUrl}`, data)
      .then((res) => {
        fetchTodos().then((items) => {
          setItems(items);
        });
        setContent("");
      })
      .catch((err) => {});
  };

  const removeData = (id) => {
    axios.delete(`${baseUrl}/${id}`).then((res) => {
      const del = items.filter((employee) => id !== employee.id);
      setItems(del);
    });
  };

  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-8">
      <div
        className={cx("rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg", {
          "bg-white": isDarkMode === false,
          "bg-gray-800": isDarkMode === true,
        })}
      >
        <button
          onClick={handleDarkMode}
          className="inline-block  px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="mb-4">
          <h1 className="text-grey-darkest text-center text-lg font-bold">
            Todo List
          </h1>

          <form className="flex mt-4">
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              }
              placeholder="Add Todo"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={3}
            />

            <button
              disabled={content.length < 3}
              type="button"
              onClick={handleSubmit}
              className="inline-block disabled:bg-gray-500 disabled:cursor-not-allowed px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add
            </button>
          </form>
        </div>
        <div>
          {items.map(function (item, index) {
            return (
              <div key={item.id} className="flex mb-4 items-center">
                <p
                  className={cx("w-full", {
                    "text-black": isDarkMode === false,
                    "text-white": isDarkMode === true,
                  })}
                >
                  {item.content}
                </p>
                <Link to={`/edit/${item.id}`}>
                  <button className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => removeData(item.id)}
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs ml-2 leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
