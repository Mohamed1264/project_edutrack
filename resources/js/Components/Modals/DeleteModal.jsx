import { OctagonAlert } from "lucide-react"
import { useRef, useEffect } from 'react'
// L'importation du hook externe a été supprimée et le hook est intégré ci-dessous.

/**
 * Hook personnalisé pour détecter les clics à l'extérieur d'un élément référencé.
 * @param {function} handler La fonction à exécuter lorsque le clic est détecté à l'extérieur.
 * @param {object} ref L'objet ref de React (useRef) attaché à l'élément à surveiller.
 */
const useClickOutSide = (handler, ref) => {
    useEffect(() => {
        const listener = (event) => {
            // Ne rien faire si l'élément cliqué est la référence ou un de ses descendants.
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        // Ajout des écouteurs pour la souris et les appareils tactiles
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        
        return () => {
            // Nettoyage à la suppression du composant
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};


/**
 * Modale de confirmation pour la suppression d'un élément.
 * @param {object} props 
 * @param {string} props.name Nom générique de l'élément (ex: "utilisateur", "projet").
 * @param {function} props.resetModal Fonction pour fermer la modale.
 * @param {string} props.itemName Nom spécifique de l'élément à supprimer (ex: "Le projet Alpha").
 * @param {function} props.handleDelete Fonction à appeler lors de la confirmation de la suppression.
 */
export default function DeleteModal({ name ,resetModal,itemName,handleDelete = ()=>{}}) {
  const popoverRef = useRef(null);
  // Ferme la fenêtre modale lorsqu'on clique à l'extérieur
  useClickOutSide(resetModal, popoverRef)
  
  // Le console.log a été laissé pour la compatibilité avec l'état précédent, mais il est souvent superflu en production.
  console.log(handleDelete); 
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div 
          ref={popoverRef} 
          className="relative rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="px-6 py-5 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/20">
              <OctagonAlert size={32} className="text-red-500 dark:text-red-400" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Supprimer {name}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Êtes-vous sûr de vouloir supprimer **{itemName}** ? Cette action est irréversible.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              onClick={resetModal}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Supprimer {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
