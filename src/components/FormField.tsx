'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CharacterCounter } from './CharacterCounter'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  maxLength?: number
  type?: 'input' | 'textarea'
  required?: boolean
  className?: string
  showCounter?: boolean
}

export function FormField({
  label,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  type = 'input',
  required = false,
  className,
  showCounter = true
}: FormFieldProps) {
  const hasError = !!error
  const isNearLimit = maxLength ? (value.length / maxLength) >= 0.8 : false

  const inputClassName = cn(
    'bg-white transition-all duration-200',
    hasError 
      ? 'border-red-300 ring-red-100 focus:border-red-400 focus:ring-red-200' 
      : isNearLimit
      ? 'border-orange-300 ring-orange-100 focus:border-orange-400 focus:ring-orange-200'
      : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100',
    'focus:ring-2'
  )

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClassName, 'h-32 resize-none')}
          maxLength={maxLength}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
          maxLength={maxLength}
        />
      )}

      <div className="flex items-center justify-between mt-1">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-1 text-red-500"
            >
              <AlertCircle className="w-3 h-3" />
              <span className="text-xs">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {maxLength && showCounter && (
          <CharacterCounter
            current={value.length}
            max={maxLength}
            className="ml-auto"
          />
        )}
      </div>
    </motion.div>
  )
}