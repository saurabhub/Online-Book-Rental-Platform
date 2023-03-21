import Typewriter from "typewriter-effect";
import React from "react";

const Jumbotron = ({text}) => {
  return (
    <Typewriter
  options={{
    strings: text,
    autoStart: true,
    loop: true,
  }}
/>
  );
};

export default Jumbotron;
