'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  error?: string
  className?: string
}

export function FileUpload({ onFileSelect, error, className }: FileUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      if (rejectedFiles.length > 0) {
        setUploadStatus('error')
        return
      }

      const file = acceptedFiles[0]
      if (file) {
        setUploadStatus('uploading')
        setSelectedFile(file)
        
        // Simulate upload delay
        setTimeout(() => {
          setUploadStatus('success')
          onFileSelect(file)
        }, 1000)
      }
    },
    [onFileSelect]
  )

  const removeFile = () => {
    setSelectedFile(null)
    setUploadStatus('idle')
    onFileSelect(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 1024 * 1024, // 1MB
    multiple: false
  })

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center bg-white cursor-pointer transition-all duration-200',
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : error || uploadStatus === 'error'
            ? 'border-red-300 bg-red-50'
            : uploadStatus === 'success'
            ? 'border-green-300 bg-green-50'
            : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {uploadStatus === 'uploading' ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-blue-600">Téléchargement en cours...</p>
            </motion.div>
          ) : uploadStatus === 'success' && selectedFile ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-green-900">{selectedFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="p-1 hover:bg-green-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-green-600" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Fichier téléchargé avec succès</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <Upload className={cn(
                'w-8 h-8 mx-auto mb-4',
                error || uploadStatus === 'error' ? 'text-red-500' : 'text-blue-500'
              )} />
              <p className={cn(
                'mb-2',
                error || uploadStatus === 'error' ? 'text-red-600' : 'text-gray-600'
              )}>
                {isDragActive 
                  ? 'Déposez votre CV ici...' 
                  : 'Parcourez ou cliquez pour télécharger votre CV'
                }
              </p>
              <p className="text-sm text-gray-500">
                Format PDF uniquement & Taille inférieure à 1MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {(error || uploadStatus === 'error') && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mt-2 text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              {error || 'Erreur lors du téléchargement. Vérifiez le format et la taille du fichier.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}