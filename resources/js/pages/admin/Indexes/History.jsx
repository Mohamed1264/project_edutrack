import { CalendarFold } from "lucide-react"
import { Link, Outlet, useLocation } from "@inertiajs/react"
export default function History () { 
    const {pathname} = useLocation()
    const getStyle = (path) => {
        if (path === pathname) {
            return 'bg-purple-600 dark:bg-purple-900/50 text-white'
        }
        return 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300'
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link to={"/historique"} className="flex items-center gap-3">
                    <CalendarFold size={24} className="text-purple-500" />
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Historiques</h1>
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        to="/historique/schedulesHistorique"
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${getStyle("/historique/schedulesHistorique")}`}
                    >
                        View Schedules archive
                    </Link>
                    <Link
                        to="/historique/absenceHistorique"
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${getStyle("/historique/absenceHistorique")}`}
                    >
                        View Absences archive
                    </Link>
                </div>
            </div>
            <Outlet/>

        </div>
    )
}
