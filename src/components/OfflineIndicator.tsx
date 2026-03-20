import { useState, useEffect } from 'react'
import { WifiOff } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const { t } = useLanguage()

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm animate-in slide-in-from-top">
      <WifiOff className="h-4 w-4" />
      <span>{t('offline.message') || 'Sin conexión. Algunas funciones pueden no estar disponibles.'}</span>
    </div>
  )
}
