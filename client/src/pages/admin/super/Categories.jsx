import React, { useState, useRef } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../context";

import DelCat from "../../../components/modals/DelCat";

const Categories = () => {
  const { categories, createCategory, updateCategory, btnLoad, fileEndpoint } =
    useGlobalContext();
  const navigate = useNavigate();

  // Inputs
  const [input, setInput] = useState({
    category: "",
    description: "",
    file: null,
  });

  // Category
  const inputRef = useRef(null);

  const [currCateg, setCurrCateg] = useState([]);
  const [delCatClosed, setDelCatClosed] = useState(true);
  const [categEditing, setCategEditing] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    setInput((prev) => {
      return { ...prev, file: e.target.files[0] };
    });
  };

  const handleCategSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
    await createCategory(formData);
    setInput({ ...input, category: "", description: "", file: null });
    inputRef.current.value = "";
  };

  const delCategFunc = (categ) => {
    setCurrCateg(categ);
    setDelCatClosed(false);
  };

  const editCategFunc = (categ) => {
    setCurrCateg(categ);
    setCategEditing(true);
    navigate("#cat");
    setInput({
      ...input,
      category: categ.category,
      description: categ.description,
      file: "",
    });
  };

  const handleCategUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("category", input.category);
    formdata.append("description", input.description);
    if (input.file) {
      formdata.append("file", input.file);
    }
    await updateCategory(currCateg._id, formdata);
    setCategEditing(false);
    setInput({ ...input, category: "", description: "", file: null });
    inputRef.current.value = "";
  };

  return (
    <div className="categories">
      <h1 id="cat">Categories</h1>
      <h3>
        Create category <FaPlus size={13} />
      </h3>
      <form onSubmit={categEditing ? handleCategUpdate : handleCategSubmit}>
        <div className="inp-holder">
          <input type="file" ref={inputRef} onChange={handleFileChange} />
        </div>
        <div className="inp-holder">
          <input
            type="text"
            placeholder="category"
            name="category"
            onChange={handleChange}
            value={input.category}
          />
        </div>
        <div className="inp-holder">
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={input.description}
          />
        </div>
        {categEditing ? (
          <div className="btn-holder">
            {btnLoad ? (
              <button>Upudating...</button>
            ) : (
              <button>
                Edit <FaEdit />
              </button>
            )}
          </div>
        ) : (
          <div className="btn-holder">
            {btnLoad ? (
              <button>Adding...</button>
            ) : (
              <button>
                Add <FaPlus />
              </button>
            )}
          </div>
        )}
      </form>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categ, i) => {
              return (
                <tr key={i}>
                  <td className="post">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${fileEndpoint}/${categ.img})`,
                      }}
                    ></div>
                    <div className="content">
                      <strong>{categ.category}</strong>
                      <br />
                      <small>{categ.description}</small>
                    </div>
                  </td>

                  <td>
                    <div className="actn-btns">
                      <button
                        id="edit"
                        onClick={() => editCategFunc(categ)}
                        style={{ color: "green" }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        id="del"
                        onClick={() => delCategFunc(categ)}
                        style={{ color: "red" }}
                      >
                        <FaTrash />
                      </button>
                    </div>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DelCat
        closed={delCatClosed}
        setClosed={setDelCatClosed}
        categ={currCateg}
      />
    </div>
  );
};

export default Categories;
