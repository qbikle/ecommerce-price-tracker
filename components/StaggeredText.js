"use client";
import { motion } from "framer-motion";

const textVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const letterVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

const StaggeredText = ({ text }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={textVariants}>
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggeredText;
