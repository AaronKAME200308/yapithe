import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si l'utilisateur est sur mobile
 * Retourne true si la largeur d'écran est <= 768px
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fonction de vérification
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Vérification initiale
    checkMobile();

    // Écouter les changements de taille
    window.addEventListener('resize', checkMobile);

    // Nettoyage
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};