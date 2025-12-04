import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { socialLinks } from '@/constants'
import type { IconType } from 'react-icons'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Map icon names to actual components
  const iconMap: Record<string, IconType> = {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0 flex items-center gap-2"
          >
            Made with <FaHeart className="text-red-500 animate-pulse" /> by Your Name
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6 mb-4 md:mb-0"
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
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.a>
              )
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm"
          >
            © {currentYear} All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
