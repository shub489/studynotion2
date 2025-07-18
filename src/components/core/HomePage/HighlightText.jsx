import React from "react";

const HighlightText = (props) => {
  const text = props.text;
  const className = props.className;
  return (
    <span className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
      {text}
    </span>
  );
};

export default HighlightText;
