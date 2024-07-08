// Tag.jsx
import React from "react";

const Tag = ({ text }) => (
  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
    {text}
  </span>
);

export default Tag;
