import { motion } from "framer-motion";
/* eslint-disable react/prop-types */

const SearchBox = ({
  queryString,
  setQueryString,
  darkMode,
  debounceFetchData,
}) => {
  const handleQueryChange = (newQuery) => {
    setQueryString(newQuery); // Update the input field immediately
    // Trigger debounced fetchData call
  };

  // Separate the debounced function for fetching data
  console.log(queryString, "TYPEDWORD");
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
        onChange={(e) => handleQueryChange(e.target.value)} // Immediate update on typing
      />
    </motion.div>
  );
};

export default SearchBox;
