import { motion } from "framer-motion";
/* eslint-disable react/prop-types */

const RepoList = ({ repo, darkMode }) => {
  return (
    <motion.div
      className={`border border-gray-200 p-4 mb-8 rounded-md hover:shadow-lg transition-shadow ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-bold">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {repo.name}
        </a>
      </h3>
      <p className="text-sm">{repo.description}</p>
    </motion.div>
  );
};

export default RepoList;
