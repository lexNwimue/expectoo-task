import React from "react";

const Result = ({ data, count }) => {
  return (
    <>
      {Object.values(data).forEach((item) => (
        <p key={count++}>{item}</p>
      ))}
    </>
  );
};

export default Result;
