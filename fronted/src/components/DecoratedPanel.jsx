import { motion } from "framer-motion";

export default function DecoratedPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full md:w-1/2 lg:w-3/5 xl:w-2/3 
                 flex items-center justify-center 
                 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white 
                 overflow-hidden relative 
                 h-60 md:h-auto 
                 rounded-t-3xl md:rounded-l-3xl md:rounded-t-none shadow-lg"
    >
      {/* Decorative Bubbles */}
      <div className="absolute w-24 h-24 bg-purple-300 rounded-full top-6 -left-6 blur-2xl opacity-30"></div>
      <div className="absolute w-20 h-20 bg-indigo-300 rounded-full bottom-6 -right-6 blur-2xl opacity-30"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center max-w-sm px-6 py-8 md:py-24">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4 leading-snug">
          Take Control of Your Spending
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-indigo-100 leading-relaxed">
          Empower yourself to make smarter financial decisions.
          <br />
          Start tracking, saving, and growing your money today.
        </p>
      </div>
    </motion.div>
  );
}
