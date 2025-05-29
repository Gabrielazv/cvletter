'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  className?: string
}

export function FAQSection({ faqs, className }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <motion.button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ backgroundColor: '#f9fafb' }}
            whileTap={{ scale: 0.995 }}
          >
            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
            <motion.div
              animate={{ rotate: openFaq === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {openFaq === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: 'easeInOut',
                  opacity: { duration: 0.2 }
                }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="px-6 py-4 bg-white border-t border-gray-100"
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}