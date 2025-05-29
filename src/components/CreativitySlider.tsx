'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CreativitySliderProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const creativityLevels = [
  { label: 'Très formel', color: '#6b7280', description: 'Ton professionnel et conventionnel' },
  { label: 'Formel', color: '#60a5fa', description: 'Ton sérieux mais accessible' },
  { label: 'Naturel', color: '#10b981', description: 'Ton équilibré et authentique' },
  { label: 'Créatif', color: '#f59e0b', description: 'Ton original et dynamique' },
  { label: 'Très créatif', color: '#8b5cf6', description: 'Ton audacieux et innovant' }
]

export function CreativitySlider({ value, onChange, className }: CreativitySliderProps) {
  return (
    <div className={cn('bg-white rounded-lg p-6', className)}>
      {/* Slider Track */}
      <div className="relative mb-6">
        {/* Background track */}
        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
          {/* Progress fill */}
          <motion.div
            className="h-full rounded-full"
            initial={false}
            animate={{
              width: `${((value + 1) / creativityLevels.length) * 100}%`,
              backgroundColor: creativityLevels[value].color
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Slider thumb */}
        <motion.div
          className="absolute top-1/2 w-6 h-6 -mt-3 -ml-3 bg-white border-4 rounded-full shadow-lg cursor-pointer"
          initial={false}
          animate={{ 
            left: `${((value + 1) / creativityLevels.length) * 100}%`,
            borderColor: creativityLevels[value].color
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Level buttons */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {creativityLevels.map((level, index) => (
          <motion.button
            key={level.label}
            onClick={() => onChange(index)}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center',
              value === index
                ? 'text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
            )}
            style={{
              backgroundColor: value === index ? level.color : undefined
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {level.label}
          </motion.button>
        ))}
      </div>

      {/* Description */}
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p className="text-sm text-gray-600">
          {creativityLevels[value].description}
        </p>
      </motion.div>
    </div>
  )
}