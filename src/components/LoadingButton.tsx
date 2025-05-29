'use client'

import { motion } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LoadingButtonProps {
  children: React.ReactNode
  loading?: boolean
  success?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function LoadingButton({ 
  children, 
  loading = false, 
  success = false, 
  disabled = false,
  onClick,
  className,
  type = 'button'
}: LoadingButtonProps) {
  const isDisabled = loading || disabled

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        success ? 'bg-green-500 hover:bg-green-600' : '',
        className
      )}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={{ 
          opacity: loading ? 0.7 : 1,
          scale: loading ? 0.95 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.div>
        )}
        
        {success && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-4 h-4" />
          </motion.div>
        )}
        
        <motion.span
          animate={{ 
            x: loading ? 8 : success ? 8 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          {loading ? 'Génération en cours...' : success ? 'Générée avec succès !' : children}
        </motion.span>
      </motion.div>

      {/* Success animation overlay */}
      {success && (
        <motion.div
          className="absolute inset-0 bg-green-400 opacity-20"
          initial={{ scale: 0, borderRadius: '50%' }}
          animate={{ scale: 2, borderRadius: '0%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </Button>
  )
}