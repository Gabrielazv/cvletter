'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
}

interface TestimonialsGridProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialsGrid({ testimonials, className }: TestimonialsGridProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${className}`}
    >
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.name}
          variants={itemVariants}
          whileHover={{ 
            y: -5, 
            transition: { duration: 0.2 } 
          }}
          className="bg-white rounded-lg p-4 md:p-6 text-left shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                {testimonial.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 truncate">
                {testimonial.role}
              </p>
            </div>
            <motion.img 
              src="https://ext.same-assets.com/3111735015/1787624407.svg" 
              alt="Twitter" 
              className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
            {testimonial.content}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}