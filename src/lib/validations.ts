import { z } from 'zod'

export const formSchema = z.object({
  jobTitle: z
    .string()
    .min(1, 'L\'intitulé du poste est requis')
    .max(150, 'L\'intitulé ne peut pas dépasser 150 caractères'),
  company: z
    .string()
    .min(1, 'Le nom de l\'entreprise est requis')
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  location: z
    .string()
    .min(1, 'La localisation est requise')
    .max(100, 'La localisation ne peut pas dépasser 100 caractères'),
  description: z
    .string()
    .min(50, 'La description doit contenir au moins 50 caractères')
    .max(3000, 'La description ne peut pas dépasser 3000 caractères'),
  creativity: z.number().min(0).max(4),
  cv: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, 'Le fichier ne peut pas dépasser 1MB')
    .refine(
      (file) => file.type === 'application/pdf',
      'Seuls les fichiers PDF sont acceptés'
    )
})

export type FormData = z.infer<typeof formSchema>