import React from "react";

const NewsLetterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="eg. nyash@gmail.com" />
      <button>Subscribe</button>
    </form>
  );
};

export default NewsLetterForm;
