"use client";
import React from "react";
import { motion } from "framer-motion";

const LandingText = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font text-5xl font-extrabold text-primary">
          Track Your Products With Ease
        </h1>
      </motion.div>
    </div>
  );
};

export default LandingText;
