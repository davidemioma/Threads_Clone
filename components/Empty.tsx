import React from "react";

interface Props {
  text: string;
}

const Empty = ({ text }: Props) => {
  return (
    <p className="text-center text-light-1 md:text-lg font-semibold">{text}</p>
  );
};

export default Empty;
