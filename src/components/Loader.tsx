import { motion, Transition } from "framer-motion";
import React from "react";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <div className="pt-20 w-full h-screen flex justify-center">
      <motion.div
        className="w-20 h-20 flex justify-around"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="block w-4 h-4 bg-black rounded-full"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-black rounded-full"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-black rounded-full"
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
};

export default Loader;
