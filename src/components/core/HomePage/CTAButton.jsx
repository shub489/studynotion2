import React from "react";
import { Link } from "react-router-dom";

const CTAButton = (props) => {
  const text = props.text;
  const className = props.className;
  const linkto = props.linkto;
  const active = props.active;

  return (
    <Link className={className}>
      {/* <Link to={linkto} className={className}> */}
      {/* <button className={className}>{text}</button> */}
      {text}
    </Link>
  );
};

export default CTAButton;
