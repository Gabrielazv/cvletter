'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CharacterCounterProps {
  current: number
  max: number
  className?: string
  showProgress?: boolean
}

export function CharacterCounter({ current, max, className, showProgress = false }: CharacterCounterProps) {
  const percentage = (current / max) * 100
  const isWarning = percentage >= 80
  const isError = percentage >= 95
  const isOverLimit = current > max

  const getColor = () => {
    if (isOverLimit) return 'text-red-600'
    if (isError) return 'text-red-500'
    if (isWarning) return 'text-orange-500'
    return 'text-gray-500'
  }

  const getProgressColor = () => {
    if (isOverLimit) return 'bg-red-500'
    if (isError) return 'bg-red-400'
    if (isWarning) return 'bg-orange-400'
    return 'bg-blue-400'
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {showProgress && (
        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={cn('h-full rounded-full transition-colors duration-300', getProgressColor())}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      )}
      
      <motion.span 
        className={cn('text-sm font-medium transition-colors duration-300', getColor())}
        animate={{ 
          scale: isOverLimit ? [1, 1.05, 1] : 1 
        }}
        transition={{ 
          duration: 0.3,
          repeat: isOverLimit ? Number.POSITIVE_INFINITY : 0,
          repeatType: 'reverse'
        }}
      >
        {current}/{max}
        {isOverLimit && ' ⚠️'}
      </motion.span>
    </div>
  )
}