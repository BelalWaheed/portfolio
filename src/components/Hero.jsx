import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center py-20">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent"
      >
        Hi, I'm Belal
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-4 text-gray-600 text-lg"
      >
        Full Stack Developer & UI/UX Designer
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 flex justify-center gap-4"
      >
        <button className="bg-black text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 duration-300">
          View My Work
        </button>
        <button className="bg-white border border-black px-6 py-2 rounded-xl hover:scale-105 duration-300">
          Download CV
        </button>
      </motion.div>
    </section>
  );
}
