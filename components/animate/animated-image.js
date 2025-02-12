import { motion } from "framer-motion";

const AnimatedImage = ({ className, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start fully transparent
      animate={{ opacity: 1 }} // Fade in to fully visible
      exit={{ opacity: 0 }} // Fade out to fully transparent
      transition={{ duration: 3 }} // Adjust the duration for smooth transitions
      style={{ display: "inline-block" }} // Optional: Prevent layout shift
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedImage;
