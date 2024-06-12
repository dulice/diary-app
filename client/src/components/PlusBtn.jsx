import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { diariesButton } from "./Variant";
import { BsFillPlusCircleFill } from "react-icons/bs";

const PlusBtn = () => {
  return (
    <>
      <Link to="/writediary">
        <motion.button
          variants={diariesButton}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileFocus="hover"
          className="fixed bottom-10 inset-x-1/2 translate-x-1/2"
        >
          <BsFillPlusCircleFill className="text-blue-500 text-5xl hover:text-blue-600 duration-500" />
        </motion.button>
      </Link>
    </>
  );
};

export default PlusBtn;
