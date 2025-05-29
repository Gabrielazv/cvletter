'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Upload, User, MessageSquare, Star, ArrowRight } from 'lucide-react'

// Enhanced Components
import { FormField } from '@/components/FormField'
import { FileUpload } from '@/components/FileUpload'
import { CreativitySlider } from '@/components/CreativitySlider'
import { FAQSection } from '@/components/FAQSection'
import { LoadingButton } from '@/components/LoadingButton'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { AnimatedSection } from '@/components/AnimatedSection'

// Validation
import { formSchema, type FormData } from '@/lib/validations'

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    setValue,
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      company: '',
      location: '',
      description: '',
      creativity: 2
    }
  })

  const watchedValues = watch()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsSuccess(true)
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const testimonials = [
    {
      name: 'Clémentine Lassalle',
      role: 'Étudiante en Informatique',
      content: '3 mois de galère pour enfin réussir à trouver mon stage... Franchement, utilisez @CVLetter dès le début de vos recherches. La lettre générée a clairement fait la différence pour moi',
      avatar: 'https://ext.same-assets.com/3111735015/3394157246.svg'
    },
    {
      name: 'Vincent Lefebvre',
      role: 'Jeune diplômé Ingénieur',
      content: 'Je pensais être trop malin en écrivant mes lettres de motivation avec ChatGPT. Quelle erreur. @CVLetter c\'est 10x mieux et beaucoup plus rapide',
      avatar: 'https://ext.same-assets.com/3111735015/3290409845.png'
    },
    {
      name: 'Aïcha Kaba',
      role: 'Chef de projet Marketing',
      content: 'C\'est la première fois que je réalise que la lettre de motivation, ça change une candidature ! Ma nouvelle manager vient de me dire qu\'elle a été choquée par la mienne tellement qu\'elle était bien alors que je l\'ai faite en 5 secondes avec l\'IA de @CVLetter',
      avatar: 'https://ext.same-assets.com/3111735015/1890071469.png'
    },
    {
      name: 'Olivier Marchand',
      role: 'Designer',
      content: 'Vous aussi vous avez galéré à trouver votre premier CDI ? Non car là moi je sors de 6 mois de galère. Utilisez @CVLetter pour gagner du temps, et dès le début ! C\'est grâce à leur IA que j\'ai eu mes entretiens !',
      avatar: 'https://ext.same-assets.com/3111735015/2128135782.png'
    },
    {
      name: 'Sophie Dubois',
      role: 'Alternante RH',
      content: 'Un conseil, ne faites pas la même erreur que moi pour trouver votre alternance. Cherchez tôt et bien. La lettre de motivation, c\'est pas un plus. C\'est obligatoire. Et @CVLetter va la personnaliser pour vous en 5 secondes donc ne passez pas à côté',
      avatar: 'https://ext.same-assets.com/3111735015/2865309858.png'
    },
    {
      name: 'Karim Bensalah',
      role: 'Développeur Junior',
      content: 'Je déteste les RH. Ils te forcent à écrire des lettres de motivation qu\'ils lisent même pas. Utilisez @CVLetter les gars, ça prend 5 secondes et vous avez une lettre personnalisée à l\'offre et au CV',
      avatar: 'https://ext.same-assets.com/3111735015/578488904.png'
    }
  ]

  const faqs = [
    {
      question: 'Comment créer une lettre de motivation avec l\'IA ?',
      answer: 'Pour créer une lettre de motivation avec l\'intelligence artificielle, copiez-collez les détails de l\'offre d\'emploi ou de stage dans le formulaire CVLetter, accompagné de votre CV. Notre IA analyse les données pour créer une lettre optimisée pour l\'offre, mettant en avant vos connaissances et compétences pertinentes pour ce poste.'
    },
    {
      question: 'Combien de temps faut-il pour générer une lettre de motivation avec l\'IA ?',
      answer: 'La génération prend généralement quelques secondes à une minute, selon la complexité de l\'offre et du CV. Cela vous permet de gagner un temps précieux dans votre recherche d\'emploi.'
    },
    {
      question: 'Est-il possible de modifier une lettre de motivation générée par CVLetter ?',
      answer: 'Oui, vous pouvez personnaliser et ajuster chaque lettre de motivation générée par l\'IA pour qu\'elle corresponde parfaitement à vos besoins et à vos préférences. Vous avez 2 options : Regénérer les phrases qui ne vous plaisent pas en les sélectionnant, ou modifier manuellement les phrases sur la plateforme.'
    },
    {
      question: 'Les lettres de motivation générées par l\'IA sont-elles uniques ?',
      answer: 'Oui, chaque lettre de motivation est unique et adaptée spécifiquement à l\'offre d\'emploi et à votre profil.'
    },
    {
      question: 'Comment CVLetter assure-t-il la qualité des lettres de motivation générées ?',
      answer: 'CVLetter utilise un modèle d\'IA entraîné sur plus de 1000 lettres de motivation de haute qualité, sélectionnées à la main. Cela garantit que chaque lettre générée est bien structurée et persuasive.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        className="border-b border-gray-100 px-4 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold text-gray-900"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            CVLetter
          </motion.div>
          <div className="flex items-center gap-4 md:gap-6">
            <motion.div 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="https://ext.same-assets.com/3111735015/3783633550.svg" alt="" className="w-4 h-4" />
              <span className="hidden sm:inline">Connexion</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="https://ext.same-assets.com/3111735015/2563901416.svg" alt="" className="w-4 h-4" />
              <span className="hidden sm:inline">Blog</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <AnimatedSection className="px-4 py-12 md:py-16 text-center" delay={0.2}>
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Des lettres de motivation<br />
            qui vous{' '}
            <motion.span 
              className="text-blue-500 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              démarquent
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-blue-200 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Obtenez <strong>plus d'entretiens</strong> grâce à des lettres <strong>100% personnalisées</strong> qui{' '}
            <strong>captivent les recruteurs</strong> et vous démarquent des autres candidats.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-3 text-base md:text-lg rounded-md group transition-all duration-300"
              onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Je crée gratuitement ma lettre
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Company Logos */}
      <AnimatedSection className="px-4 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos candidats ont <strong>obtenu des entretiens</strong><br className="hidden sm:block" />
            <span className="sm:hidden"> </span>dans <strong>ces entreprises</strong>
          </motion.p>
          <motion.div 
            className="flex items-center justify-center gap-4 md:gap-8 flex-wrap opacity-60"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              { src: "https://ext.same-assets.com/3111735015/2746230209.png", alt: "Carrefour" },
              { src: "https://ext.same-assets.com/3111735015/1902532346.png", alt: "Safran" },
              { src: "https://ext.same-assets.com/3111735015/2884392205.png", alt: "Air France" },
              { src: "https://ext.same-assets.com/3111735015/1934941596.png", alt: "Société Générale" }
            ].map((logo) => (
              <motion.img 
                key={logo.alt}
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 md:h-12 hover:opacity-100 transition-opacity duration-300" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Main Form */}
      <AnimatedSection id="form-section" className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-blue-50 rounded-2xl p-6 md:p-8 space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Job Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                </motion.div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Informations sur l'emploi</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  placeholder="Intitulé du poste"
                  value={watchedValues.jobTitle}
                  onChange={(value) => {
                    setValue('jobTitle', value)
                    trigger('jobTitle')
                  }}
                  maxLength={150}
                  error={errors.jobTitle?.message}
                  required
                />
                <FormField
                  placeholder="ex: Google"
                  value={watchedValues.company}
                  onChange={(value) => {
                    setValue('company', value)
                    trigger('company')
                  }}
                  maxLength={100}
                  error={errors.company?.message}
                  required
                />
              </div>
              
              <FormField
                placeholder="ex: Paris (Hybride)"
                value={watchedValues.location}
                onChange={(value) => {
                  setValue('location', value)
                  trigger('location')
                }}
                maxLength={100}
                error={errors.location?.message}
                required
                className="mb-4"
              />
              
              <FormField
                type="textarea"
                placeholder="Copiez-collez l'offre d'emploi complète ici (3000 caractères max)"
                value={watchedValues.description}
                onChange={(value) => {
                  setValue('description', value)
                  trigger('description')
                }}
                maxLength={3000}
                error={errors.description?.message}
                required
              />
            </motion.div>

            {/* CV Upload */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="w-4 h-4 text-white" />
                </motion.div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Télécharge ton CV</h2>
              </div>
              <FileUpload 
                onFileSelect={(file) => {
                  setSelectedFile(file)
                  if (file) {
                    setValue('cv', file)
                    trigger('cv')
                  }
                }}
                error={errors.cv?.message}
              />
            </motion.div>

            {/* Creativity Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <User className="w-4 h-4 text-white" />
                </motion.div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Niveau de créativité</h2>
              </div>
              <CreativitySlider
                value={watchedValues.creativity}
                onChange={(value) => {
                  setValue('creativity', value)
                  trigger('creativity')
                }}
              />
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                success={isSuccess}
                disabled={Object.keys(errors).length > 0 || !selectedFile}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg rounded-lg"
              >
                Générer ma lettre de motivation
              </LoadingButton>
            </motion.div>
          </motion.form>
        </div>
      </AnimatedSection>

      {/* Success Stories */}
      <AnimatedSection className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            CVLetter a changé<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>leur <span className="text-blue-500">carrière</span>
          </motion.h2>
          
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <motion.img 
                key={`star-${i}`} 
                src="https://ext.same-assets.com/3111735015/2838098675.svg" 
                alt="star" 
                className="w-5 h-5 md:w-6 md:h-6" 
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              />
            ))}
          </motion.div>
          
          <motion.p 
            className="text-blue-500 font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            33 892 candidats satisfaits
          </motion.p>
          
          <motion.p 
            className="text-gray-500 text-sm mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            (c'est long à actualiser...)
          </motion.p>

          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Les questions de nos utilisateurs
          </motion.h2>
          <FAQSection faqs={faqs} />
        </div>
      </AnimatedSection>

      {/* Blog Articles */}
      <AnimatedSection className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos astuces
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '📝',
                title: 'Écrire une lettre de motivation pour un stage',
                description: 'Découvrez comment écrire une lettre de motivation efficace pour décrocher un stage.'
              },
              {
                icon: '🎓',
                title: 'Écrire une lettre de motivation pour une alternance',
                description: 'Apprenez les meilleures pratiques pour rédiger une lettre de motivation pour une alternance.'
              },
              {
                icon: '🇬🇧',
                title: 'Écrire une lettre de motivation en anglais',
                description: 'Suivez nos conseils pour rédiger une lettre de motivation en anglais.'
              }
            ].map((article) => (
              <motion.div
                key={article.title}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="w-8 h-8 bg-blue-500 rounded mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white font-bold">{article.icon}</span>
                </motion.div>
                <h3 className="font-semibold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {article.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Voir plus d'articles
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <motion.footer 
        className="px-4 py-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
          <motion.a 
            href="/cv-optimizer" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="https://ext.same-assets.com/3111735015/2771603144.svg" alt="" className="w-4 h-4" />
            <span className="hidden sm:inline">Optimisez votre CV avec l'IA</span>
            <span className="sm:hidden">CV IA</span>
            <img src="https://ext.same-assets.com/3111735015/658199468.svg" alt="" className="w-4 h-4" />
          </motion.a>
          <motion.a 
            href="/contact" 
            className="hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Contact
          </motion.a>
          <motion.a 
            href="/terms" 
            className="hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            CGU
          </motion.a>
        </div>
      </motion.footer>
    </div>
  )
}
