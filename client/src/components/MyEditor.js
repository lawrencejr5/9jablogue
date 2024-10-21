import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ color: [] }, { background: [] }], // Add the color options
    ["clean"],
  ],
};
const MyEditor = () => {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      className="quill-editor"
      modules={modules}
      value={value}
      onChange={setValue}
    />
  );
};

export default MyEditor;
