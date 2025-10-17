import { OctagonAlert } from "lucide-react";
import { useRef, useEffect } from "react";

/**
 * Hook personnalisé pour détecter les clics à l'extérieur d'un élément référencé.
 * Intégré ici pour éviter les erreurs de dépendance non résolue.
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
 * Modale de confirmation pour l'effacement complet d'un horaire.
 * @param {object} props 
 * @param {function} props.handleCancel Fonction pour annuler et fermer la modale.
 * @param {object} props.selectedItem L'objet horaire sélectionné.
 * @param {string} props.name Le nom de la propriété à afficher (ex: 'name' pour selectedItem.name).
 * @param {function} props.clearSchedule Fonction pour confirmer l'effacement permanent.
 */
export default function ClearScheduleModal({
  handleCancel,
  selectedItem,
  name,
  clearSchedule,
}) {
  const popoverRef = useRef(null);
  // Ferme la fenêtre modale lorsqu'on clique à l'extérieur
  useClickOutSide(handleCancel, popoverRef);

  // Fallback au cas où clearSchedule n'est pas une fonction ou est mal défini
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof clearSchedule === "function") {
      clearSchedule(e);
    } else {
      // Si la fonction n'existe pas, on annule.
      handleCancel?.();
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Conteneur de la Modale */}
      <div
        ref={popoverRef}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* En-tête */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40">
              <OctagonAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Effacer l'Horaire
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Êtes-vous certain de vouloir effacer cet horaire de façon permanente ?
              </p>
            </div>
          </div>

          {/* Contenu */}
          <div className="px-6 py-5 text-center">
            <p className="text-base text-gray-700 dark:text-gray-300">
              Vous êtes sur le point de supprimer{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedItem?.[name] || "cet horaire"}
              </span>
              . Cette action est irréversible.
            </p>
          </div>

          {/* Pied de page */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none 
                dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 
                transition-all duration-150"
            >
              Annuler
            </button>

            <button
              type="submit" // Changement de type pour utiliser le onSubmit du formulaire
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg 
                hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none 
                transition-all duration-150"
            >
              Supprimer Définitivement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
