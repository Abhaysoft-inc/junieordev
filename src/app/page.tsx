"use client"

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CodeBracketIcon, LightBulbIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Meet <span className="text-blue-500">JunieorDev</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Your AI companion for learning programming concepts and debugging. Get instant help, explanations, and guidance as you code.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/home" className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gray-800/50 p-8 rounded-xl"
          >
            <CodeBracketIcon className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Real-time Debugging</h3>
            <p className="text-gray-300">Get instant help with your code issues and learn best practices along the way.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gray-800/50 p-8 rounded-xl"
          >
            <LightBulbIcon className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Concept Explanations</h3>
            <p className="text-gray-300">Learn programming concepts with clear, interactive explanations tailored to your level.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gray-800/50 p-8 rounded-xl"
          >
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Interactive Learning</h3>
            <p className="text-gray-300">Engage in conversations about code, ask questions, and get personalized guidance.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-blue-500/10 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Level Up Your Coding Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of junior developers who are accelerating their learning with JunieorDev.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/home" className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
              Start Learning Now
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
