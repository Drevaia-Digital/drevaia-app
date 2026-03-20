import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, CreditCard, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CheckoutModal } from './CheckoutModal';
import { useCart } from '@/hooks/useCart';
import type { Language } from '@/i18n';

interface CartDrawerProps {
  language: Language;
}

export function CartDrawer({ language }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { items, removeItem, clearCart, getTotal, getItemCount, isHydrated } = useCart();

  const labels = {
    cart: language === 'es' ? 'Carrito' : language === 'en' ? 'Cart' : language === 'fr' ? 'Panier' : 'Carrinho',
    empty: language === 'es' ? 'Tu carrito está vacío' : language === 'en' ? 'Your cart is empty' : language === 'fr' ? 'Votre panier est vide' : 'Seu carrinho está vazio',
    emptyDesc: language === 'es' ? 'Explora nuestra biblioteca y encuentra tu próximo eBook' : language === 'en' ? 'Explore our library and find your next eBook' : language === 'fr' ? 'Explorez notre bibliothèque et trouvez votre prochain eBook' : 'Explore nossa biblioteca e encontre seu próximo eBook',
    browse: language === 'es' ? 'Explorar libros' : language === 'en' ? 'Browse books' : language === 'fr' ? 'Parcourir les livres' : 'Explorar livros',
    total: language === 'es' ? 'Total' : language === 'en' ? 'Total' : language === 'fr' ? 'Total' : 'Total',
    checkout: language === 'es' ? 'Finalizar compra' : language === 'en' ? 'Checkout' : language === 'fr' ? 'Passer la commande' : 'Finalizar compra',
    clear: language === 'es' ? 'Vaciar carrito' : language === 'en' ? 'Clear cart' : language === 'fr' ? 'Vider le panier' : 'Esvaziar carrinho',
    remove: language === 'es' ? 'Eliminar' : language === 'en' ? 'Remove' : language === 'fr' ? 'Supprimer' : 'Remover',
  };

  const itemCount = isHydrated ? getItemCount() : 0;
  const total = isHydrated ? getTotal() : 0;

  const checkoutItems = items.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    currency: item.currency,
    image: item.image,
  }));

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {labels.cart}
              {itemCount > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({itemCount})
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {labels.empty}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
                  {labels.emptyDesc}
                </p>
                <Link to="/library" onClick={() => setIsOpen(false)}>
                  <Button variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {labels.browse}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    {/* Image */}
                    <Link 
                      to={`/books/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex-shrink-0"
                    >
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-amber-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-purple-400" />
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/books/${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white truncate hover:text-purple-600 transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.currency.toUpperCase()}
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                      title={labels.remove}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{labels.total}</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-amber-500"
                  onClick={() => {
                    setIsOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {labels.checkout}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {labels.clear}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        language={language}
      />
    </>
  );
}
