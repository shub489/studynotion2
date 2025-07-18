import React from "react";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = () => {
  return (
    <div className="w-full lg:w-[470px] h-[318px] lg:h-[278px] text-sm p-2 border-2  flex justify-between items-center gap-2 bg-gradient-to-r from-[#0E1A2D] to-[#111E32] ">
      <div className="w-[5%] p-1 font-bold text-richblack-400">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
      </div>
      <div class="w-[95%]  font-bold text-brown-100">
        <p className="text-brown-100">&lt;!DOCTYPE html&gt;</p>
        <p>&lt;html&gt;</p>
        <p>&nbsp;&nbsp;&lt;head&gt;&lt;title&gt;Example&lt;/title&gt;</p>
        <p>&nbsp;&nbsp;&lt;link rel="stylesheet" href="styles.css" &gt;</p>
        <p>&nbsp;&nbsp;&lt;/head&gt;</p>
        <p>&nbsp;&nbsp;&lt;body&gt;</p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;&lt;a
          href="/"&gt;Header&lt;/a&gt;&lt;/h1&gt;
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;nav&gt;&lt;a
          href="one/"&gt;One&lt;/a&gt;&lt;a
          href="two/"&gt;Two&lt;/a&gt;&lt;/nav&gt;
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;a href="three/"&gt;Three&lt;/a&gt;</p>
        <p>&nbsp;&nbsp;&lt;/body&gt;</p>
        <p>&lt;/html&gt;</p>
      </div>
    </div>
  );
};

export default CodeBlocks;
