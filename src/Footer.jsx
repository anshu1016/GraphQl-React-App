/* eslint-disable react/prop-types */
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Importing icons
import { FaHashnode } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer
      className="flex items-center justify-center p-4 text-center mt-4 text-white bg-gray-800 fixed bottom-0 left-0 right-0 "
      style={{ height: "60px" }}
    >
      <br />
      <div className="flex justify-center space-x-6 ">
        <a
          href="https://www.linkedin.com/in/arun-shukla-1399a9196/"
          target="_blank"
          className="flex items-center hover:text-blue-500 cursor-pointer"
        >
          <FaLinkedin className="text-lg" />
        </a>
        <a
          href="https://github.com/anshu1016"
          target="_blank"
         
          className="flex items-center hover:text-gray-300 cursor-pointer"
        >
          <FaGithub className="text-lg" />
        </a>
        <a
          href="https://hashnode.com/@Anshu07"
          target="_blank"
          
          className="flex items-center hover:text-green-400 cursor-pointer"
        >
          <FaHashnode className="text-lg" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
