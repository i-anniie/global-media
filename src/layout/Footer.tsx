import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="main-container flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-10 h-10"
    >
      {/* <div className="flex items-center gap-10 font-semibold"> */}
      <p className="text-sm">
        ©{new Date().getFullYear()} Global Media Group. All Rights Reserved.
      </p>
      <div className="flex gap-1 lg:justify-end">
        <p className="text-sm">
          Designed and Developed By{" "}
          <span>
            <a
              href="https://github.com/i-anniie"
              target="_blank"
              className="common-transition font-semibold text-red-500 hover:text-red-700"
            >
              Anwesh
            </a>
          </span>
        </p>
        {/* </div> */}
      </div>
    </motion.section>
  );
};

export default Footer;
