import { motion } from "framer-motion";
/* eslint-disable react/prop-types */

const NavButtons = ({ start, end, next, previous, onPage, darkMode }) => {
  return (
    <div className="flex justify-between mt-6">
      {previous && (
        <button
          className={`px-4 py-2 rounded-md ${
            darkMode
              ? "bg-gradient-to-r from-yellow-400 to-red-400 text-black hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-400"
              : "bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500"
          }`}
          onClick={() => onPage("last", `before: "${start}"`)}
        >
          Previous
        </button>
      )}
      {next && (
        <button
          className={`px-4 py-2 rounded-md ${
            darkMode
              ? "bg-gradient-to-r from-green-400 to-blue-400 text-black hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-400"
              : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500"
          }`}
          onClick={() => onPage("first", `after: "${end}"`)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavButtons;
