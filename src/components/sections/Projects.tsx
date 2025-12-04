import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useProjects } from '@/hooks/useProjects'
import { containerVariants, itemVariants } from '@/constants'

const Projects = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { projects, loading } = useProjects()

  return (
    <section id="projects" ref={ref} className="py-20 bg-gradient-to-br from-gray-50 dark:from-gray-900 to-primary-50 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">My Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
              A collection of projects showcasing my skills and creativity
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600 dark:text-white">Loading projects...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub className="w-5 h-5" />
                        Code
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt className="w-5 h-5" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
