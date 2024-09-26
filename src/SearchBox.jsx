import { motion } from "framer-motion";
/* eslint-disable react/prop-types */

const SearchBox = ({ queryString, onQueryChange, darkMode }) => {
  return (
    <motion.div
      className="mb-6 w-full"
      initial={{ scaleX: 0.8, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Search for repositories..."
        className={`w-full p-4 text-xl rounded-lg border-none focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
          darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
        }`}
        value={queryString}
        onChange={(e) => onQueryChange(e.target.value)} // Ensure this is updating the state
      />
    </motion.div>
  );
};

export default SearchBox;
