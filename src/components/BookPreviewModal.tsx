import { ExternalLink, X, BookOpen, Clock, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    title: string;
    description: string;
    link: string;
    collection: string;
  } | null;
}

const features = [
  'Descarga inmediata',
  'Formato PDF y EPUB',
  'Acceso de por vida',
  'Actualizaciones gratuitas',
];

export function BookPreviewModal({ isOpen, onClose, book }: BookPreviewModalProps) {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-white rounded-3xl">
        {/* Header Image */}
        <div className="relative h-48 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-80" />
              <span className="text-sm font-medium opacity-80">{book.collection}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {book.title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 leading-relaxed mb-6">
            {book.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-6 p-4 bg-purple-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">Lectura: 2-3 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-sm text-gray-600">4.9/5 valoración</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white rounded-xl py-6 shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Comprar en Payhip
              </Button>
            </a>
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-xl py-6 border-gray-200"
            >
              Seguir explorando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
