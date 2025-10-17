import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Trash2, Save, Download } from "lucide-react";
import { useState } from "react";

/**
 * Composant d'en-tête pour l'affichage de l'horaire.
 * Gère l'affichage du titre, les heures totales, la période, et les actions (navigation, effacement, sauvegarde, exportation).
 */
export default function ScheduleHeader({
    handlePreviousVersion,
    handleExport,
    handleNextVersion,
    activeScheduleVersion,
    scheduleVersionsLength,
    scheduleLength,
    firstDate,
    secondDate,
    handleClearSchedule,
    handleSaveChanges,
    owner,
    name,
    entity,
    numberHours
}) {
    const [saveMenu, setSaveMenu] = useState(false);
    const ownerName = owner[name];

    /**
     * Détermine l'abréviation de civilité (M. ou Mme) en fonction du genre.
     * @param {string} gender Le genre de l'utilisateur ('Male' ou autre).
     * @returns {string} L'abréviation de civilité ('M.' ou 'Mme').
     */
    const getGender = (gender) => {
        return gender === 'Male' ? 'M.' : 'Mme';
    };

    // Construit le titre : pour les enseignants, utilise la civilité et le nom complet, sinon utilise le nom de l'entité.
    const title = entity === 'teachers' ? `${getGender(owner.user.gender)} ${owner.user.full_name}` : ownerName;

    const toggleSaveMenu = () => setSaveMenu(!saveMenu);

    /**
     * Gère la sauvegarde de l'horaire, avec option d'exporter après la sauvegarde.
     * @param {boolean} saveWithExport Si vrai, appelle aussi la fonction d'exportation.
     */
    const save = (saveWithExport) => {
        if (saveWithExport) {
            handleSaveChanges();
            handleExport();
            // Optionnel : afficher un toast de succès si vous utilisez react-hot-toast
            // toast.success("Sauvegardé et exporté avec succès !");
            return false;
        }
        handleSaveChanges();
        // Optionnel : afficher un toast de succès
        // toast.success("Modifications enregistrées !");
        setSaveMenu(false);
    };

    return (
        <div className="flex items-center w-full justify-between gap-4 mb-6">
            {/* Section Titre et Dates */}
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-xl capitalize font-bold text-gray-700 dark:text-gray-50 ">
                    {title}
                    <span className="ml-2 font-normal text-sm text-gray-500 dark:text-gray-400">
                        ({numberHours} heures)
                    </span>
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {/* Affichage de la plage de dates */}
                    {firstDate && firstDate !== 'null'
                        ? `du ${firstDate}`
                        : `du ${new Date().toISOString().split('T')[0]}`}
                    {secondDate && secondDate !== 'null'
                        ? ` au ${secondDate}`
                        : ''}
                </span>

            </div>
            {/* Section Boutons d'Action */}
            <div className="flex items-center gap-3">
                {/* Contrôle de Version */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePreviousVersion}
                        disabled={activeScheduleVersion === 1}
                        title="Version précédente"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                            rounded-lg hover:bg-gray-50 focus:outline-none 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            dark:hover:bg-gray-700 transition-colors 
                            disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button
                        onClick={handleNextVersion}
                        disabled={activeScheduleVersion === scheduleVersionsLength}
                        title="Version suivante"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                            rounded-lg hover:bg-gray-50 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            dark:hover:bg-gray-700 transition-colors 
                            disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>
                
                {/* Bouton Vider l'Horaire */}
                <button
                    disabled={scheduleLength === 0}
                    onClick={handleClearSchedule}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 
                        rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 
                        disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                    <Trash2 size={16} />
                    Vider l'Horaire
                </button>
                
                {/* Bouton Enregistrer avec Menu déroulant */}
                <div className="relative">
                    <button
                        onClick={toggleSaveMenu}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-500 
                            rounded-lg hover:bg-emerald-600 focus:ring-2 focus:outline-none focus:ring-emerald-300 
                            transition-colors"
                    >
                        <Save size={16} />
                        Enregistrer
                    </button>
                    {
                        saveMenu &&
                        <div className="absolute z-50 w-full min-w-[180px] flex flex-col items-center gap-2 top-full mt-2 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl right-0">
                            <button
                                disabled={scheduleLength === 0}
                                className="text-sm font-medium px-3 py-2 bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-purple-600 dark:hover:bg-purple-700 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => save(false)}
                            >
                                Enregistrer seulement
                            </button>
                            <button
                                disabled={scheduleLength === 0}
                                className="text-sm font-medium px-3 py-2 bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-purple-600 dark:hover:bg-purple-700 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => save(true)}
                            >
                                Enregistrer et Exporter
                            </button>
                        </div>
                    }


                </div>

                {/* Bouton Exporter en PDF */}
                <button
                    disabled={scheduleLength === 0}
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 
                        rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
                        disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                    <Download size={16} />
                    Exporter en PDF
                </button>
            </div>
        </div>
    );
}
