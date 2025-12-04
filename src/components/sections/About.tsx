import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaPalette, FaRocket, FaHeart } from 'react-icons/fa'
import { useSkills } from '@/hooks/useSkills'
import { usePersonalInfo } from '@/hooks/usePersonalInfo'
import { containerVariants, itemVariants } from '@/constants'
import type { IconType } from 'react-icons'

const About = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { skills, loading: skillsLoading } = useSkills()
  const { personalInfo, loading: infoLoading } = usePersonalInfo()

  // Map icon names to actual components
  const iconMap: Record<string, IconType> = {
    FaCode,
    FaRocket,
    FaPalette,
    FaHeart,
  }

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
              Passionate developer with a love for creating exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Who I Am</h3>
              {!infoLoading && personalInfo.about && personalInfo.about.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-white mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                      {!infoLoading && personalInfo.name
                        ? personalInfo.name.split(' ').map(n => n[0]).join('')
                        : 'YN'}
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {!infoLoading ? personalInfo.name : 'Your Name'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {!infoLoading ? personalInfo.subtitle : 'Full Stack Developer'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Skills & Expertise</h3>
            {skillsLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => {
                  const IconComponent = iconMap[skill.icon]
                  if (!IconComponent) return null

                  return (
                    <motion.div
                      key={skill.title}
                      className="p-6 rounded-xl bg-gradient-to-br from-primary-50 dark:from-gray-800 to-purple-50 dark:to-gray-700 border border-primary-100 dark:border-gray-600 hover:shadow-lg transition-all"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <IconComponent className="w-10 h-10 text-primary-600 mb-4" />
                      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{skill.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{skill.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
