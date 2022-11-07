import {motion} from "framer-motion"


const Button = ({text, style, path}) => {
  return (
    <>
      <motion.button
        initial={{ opacity: 0.6 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        whileInView={{ opacity: 1 }}
        className={style}
      >
        {text}
      </motion.button>
    </>
  );
};

export default Button;



