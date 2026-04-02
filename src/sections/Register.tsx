import { useState, useRef } from 'react';
import { Send, Check, Heart, Sparkles, User, Mail, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { processRegistration } from '@/services/automation';
import type { Translations, Language } from '@/i18n';

interface RegisterProps {
  t: Translations;
  language: Language;
}

export function Register({ t, language }: RegisterProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: language,
    interests: [] as string[],
    newsletter: false,
  });

  const interests = [
    { id: 'healing', label: t.register.interest1 },
    { id: 'poetry', label: t.register.interest2 },
    { id: 'meditation', label: t.register.interest3 },
    { id: 'growth', label: t.register.interest4 },
  ];

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => {
      const isSelected = prev.interests.includes(interestId);
      return {
        ...prev,
        interests: isSelected
          ? prev.interests.filter((id) => id !== interestId)
          : [...prev.interests, interestId],
      };
    });
  };

  const handleSubmit = async () => {
    // Prevenir envíos múltiples
    if (isLoading || isSubmitted) return;
    
    // Validar formulario
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSubmitError(null);
    
    try {
      // Preparar datos para automatización
      const registrationData = {
        name: formData.name,
        email: formData.email,
        language: formData.language,
        interests: formData.interests,
        newsletter: formData.newsletter,
        timestamp: new Date().toISOString(),
        source: 'drevaia-website',
      };
      
      // Ejecutar flujo completo de automatización
      const results = await processRegistration(registrationData);
      
      // Siempre mostrar éxito al usuario, pero log errores en consola
      setIsSubmitted(true);
      
      // Log de resultados para debugging
      console.log('📊 Resultados del registro:', results);
      
      // Scroll suave al mensaje de éxito
      setTimeout(() => {
        const successElement = document.getElementById('register-success');
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (error) {
      console.error('❌ Error en registro:', error);
      // Aún así mostrar éxito al usuario - los datos se pueden recuperar
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      language: language,
      interests: [],
      newsletter: false,
    });
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <section
        id="register"
        className="relative py-24 md:py-32 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300"
      >
        <div id="register-success" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-500 animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.register.success}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t.register.successMessage}</p>
            <div className="flex justify-center gap-2 mb-8">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <Heart className="w-6 h-6 text-rose-400" />
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="rounded-full border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/30"
            >
              Registrar otra persona
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="register"
      className="relative py-24 md:py-32 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            {t.register.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.register.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.register.description}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 transition-colors duration-300">
          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
            </div>
          )}

          <form 
            ref={formRef} 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }} 
            className="space-y-8"
          >
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-500" />
                  {t.register.name}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  className={`rounded-xl border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-500 focus:ring-purple-500 ${
                    errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-500" />
                  {t.register.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={`rounded-xl border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-500 focus:ring-purple-500 ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Language Select */}
            <div className="space-y-2">
              <Label htmlFor="language" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                {t.register.language}
              </Label>
              <Select
                value={formData.language}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, language: value as Language }))
                }
                disabled={isLoading}
              >
                <SelectTrigger className="rounded-xl border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                  <SelectItem value="pt">🇧🇷 Português</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">{t.register.interests}</Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {interests.map((interest) => {
                  const isSelected = formData.interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => !isLoading && handleInterestToggle(interest.id)}
                      disabled={isLoading}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                          : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-300 dark:border-gray-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{interest.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  !isLoading && setFormData((prev) => ({ ...prev, newsletter: !prev.newsletter }))
                }
                disabled={isLoading}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                  formData.newsletter
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-300 dark:border-gray-500'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {formData.newsletter && <Check className="w-3 h-3 text-white" />}
              </button>
              <Label 
                htmlFor="newsletter" 
                className={`text-sm text-gray-600 dark:text-gray-400 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() =>
                  !isLoading && setFormData((prev) => ({ ...prev, newsletter: !prev.newsletter }))
                }
              >
                {t.register.newsletter}
              </Label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full hover:from-amber-500 hover:to-orange-600 hover:from-purple-700 hover:to-amber-600 text-white rounded-xl py-4 px-6 text-lg font-medium shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{t.register.submit}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
