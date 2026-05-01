import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="loader"
      />
    </div>
  )
}

export default Loader