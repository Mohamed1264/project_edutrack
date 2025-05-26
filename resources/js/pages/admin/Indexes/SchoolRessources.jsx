import { Outlet, useLocation } from "react-router-dom";
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js';

const links = [
    {
        name: "Home",
        route_name: "schoolResources"
    },
    {
        name: "Filieres",
        route_name: "schoolResources.fields"
    },
    {
        name: "Groups",
        route_name: "schoolResources.groups"
    },
    {
        name: "Rooms",
        route_name: "schoolResources.rooms"
    },
    {
        name: "Schedules",
        route_name: "schoolResources.schedules.home"
    },
    {
        name: "Progress",
        route_name: "schoolResources.progress.index"
    },
    
        
]


const activeStyle = "font-semibold text-indigo-700 dark:text-indigo-50  relative before:content-[''] before:block before:-translate-x-1/2 before:absolute before:left-1/2 before:bottom-0 before:w-2/4  before:h-1 before:rounded-full  before:bg-indigo-500 dark:before:bg-indigo-50";
const desactiveStyle = ' text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200';



export default function SchoolResources(){
   const location = useLocation();
   const path = location.pathname;
   const Links = () => {
    return (
            <div className="flex items-center gap-3">
                {links.map((link) => (
                    <Link 
                        to={link.link}
                        key={link.name}
                        className={` font-medium text-sm px-2 py-2  ${path === link.link ? activeStyle: desactiveStyle}`}
                    >
                    {link.name}

                    </Link>
                ))}
            </div>
        )
    }
    return(
        <div className="min-h-screen ">
            <nav className="w-full border-b border-gray-200 dark:border-gray-700 flex flex-1 items-center gap-3   px-6 py-2 bg-indigo-50 dark:bg-indigo-900/50 2xl:py-6  justify-between ">
                
                <Links/>
                    {
                        (path === '/schoolResources/filieres' || path === '/schoolResources/groups' || path === '/schoolResources/rooms' ) && 
                        <Link to={`${path}/add`} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
                            bg-indigo-500 text-white hover:bg-indigo-600
                            dark:bg-indigo-700 dark:hover:bg-indigo-800
                            transition-colors duration-200">
                            Add New
                        </Link>
                    }
               
            </nav>

            <Outlet/>
      </div>
    )
}
