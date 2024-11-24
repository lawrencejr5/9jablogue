import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import { useGlobalContext } from "../../../context";

import DelDuk from "../../../components/modals/DelDuk";

const Duks = () => {
  const { duks, addDuk, updateDuk, btnLoad } = useGlobalContext();

  const [input, setInput] = useState({
    duk: "",
  });
  const [currDuk, setCurrDuk] = useState(null);
  const [dukEditing, setDukEditing] = useState(false);
  const [delDukClosed, setDelDukClosed] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDukSubmit = async (e) => {
    e.preventDefault();
    await addDuk(input);
    setInput({ ...input, duk: "" });
  };

  const editDukFunc = (curr) => {
    setCurrDuk(curr);
    setInput({ duk: curr.text });
    setDukEditing(true);
  };

  const handleDukUpdate = async (e) => {
    e.preventDefault();
    await updateDuk(currDuk._id, input);
    setCurrDuk(null);
    setInput({ duk: "" });
    setDukEditing(false);
  };

  const delDukFunc = (curr) => {
    setCurrDuk(curr);
    setDelDukClosed(false);
  };
  return (
    <div className="duks">
      <h1>Did you know?</h1>
      <h3>
        Add "did you know" <FaPlus size={13} />
      </h3>
      <form onSubmit={dukEditing ? handleDukUpdate : handleDukSubmit}>
        <div className="inp-holder">
          <input
            type="text"
            onChange={handleChange}
            value={input.duk}
            name="duk"
            placeholder="did you know..."
          />
        </div>
        {dukEditing ? (
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
              <th>S/N</th>
              <th>Text</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {duks.map((duk, i) => {
              return (
                <tr key={i}>
                  <td>{duk._id}</td>
                  <td className="post">{duk.text}</td>
                  <td>
                    <div className="actn-btns">
                      <button
                        id="edit"
                        onClick={() => editDukFunc(duk)}
                        style={{ color: "green" }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        id="del"
                        onClick={() => delDukFunc(duk)}
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
        <DelDuk
          currDuk={currDuk}
          closed={delDukClosed}
          setClosed={setDelDukClosed}
        />
      </div>
    </div>
  );
};

export default Duks;
