import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import { usePersonalInfo } from '@/hooks/usePersonalInfo'
import { socialLinks, containerVariants, heroItemVariants } from '@/constants'
import { scrollToElement } from '@/utils/scrollTo'
import type { IconType } from 'react-icons'

const Hero = () => {
  const { personalInfo } = usePersonalInfo()

  // Map icon names to actual components
  const iconMap: Record<string, IconType> = {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-200/20 blur-3xl"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={heroItemVariants}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">Hi, I'm</span>
            <br />
            <span className="text-gray-900">{personalInfo.name || 'Francis Cruz'}</span>
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            {personalInfo.title || 'Full Stack Developer & Creative Problem Solver'}
          </motion.p>

          <motion.p
            variants={heroItemVariants}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            {personalInfo.bio || 'I create beautiful, functional, and user-centered digital experiences. Let\'s bring your ideas to life with modern web technologies.'}
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {socialLinks.map(({ icon, href, label }) => {
              const IconComponent = iconMap[icon]
              if (!IconComponent) return null

              return (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:text-primary-600 hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.a>
              )
            })}
          </motion.div>

          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                scrollToElement('#projects')
              }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-primary-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                scrollToElement('#contact')
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToElement('#about')
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400 hover:text-primary-600 transition-colors"
          >
            <HiArrowDown className="w-8 h-8" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
