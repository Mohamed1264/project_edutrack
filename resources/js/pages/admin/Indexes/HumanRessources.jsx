
import { successNotify } from "../../../Components/Common/Toast";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../../../layouts/Layout";

// Define the navigation links
const links = [
    {
        name: "Home",
        link: "/humanResources"
    },
    {
        name: "Absence Managers",
        link: "/humanResources/absenceManagers"
    },
    {
        name: "Teachers",
        link: "/humanResources/teachers"
    }
];

// Map certain paths to user types for the "Add New" button
const addUserLink = {
    "/humanResources/absenceManagers": "2",
    "/humanResources/teachers": "3"
};

export default function HumanRessourcesNav({children}) {
    // Get the current path from the browser's window location (no react-router-dom)
    const path = window.location.pathname;
    console.log(path);
    
    useEffect(() => {
        // Check if there is a toast message saved in localStorage
        const message = localStorage.getItem('toastMessage');
        if (message) {
            // Show a success notification using your custom function
            successNotify(message);
            // Remove the message from localStorage after 3 seconds
            setTimeout(() => {
                localStorage.removeItem('toastMessage');
            }, 3000);
        }
    }, []); // Run only once when component mounts

    // Component rendering the navigation links
    const Links = () => {
        return (
            <div className="flex items-center gap-3">
                {/* Toast notifications container */}
               

                {/* Map through links and render them as <a> tags with hrefs */}
                {links.map((link) => (
                    <a
                        href={link.link} // Use plain anchor tags for Laravel routing
                        key={link.name}
                        className={`px-3 py-1.5 rounded-lg font-medium text-sm
                        ${path === link.link
                            ? 'bg-purple-300 text-purple-700 dark:bg-purple-800/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/70'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-purple-200 dark:hover:bg-gray-800/50'
                            }
                        `}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        );
    };
    console.log(path);
    

    return (
         <Layout>
            <div className=" w-full ">
                {/* Navigation bar styling */}
                <nav
                    className="w-full border-b border-gray-200 dark:border-gray-800
                    bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50
                    px-6 py-3 flex justify-between items-center shadow-sm"
                >
                    {/* Render navigation links */}
                    <Links />

                    {/* Conditionally render "Add New" button on specific paths */}
                    {(path == '/humanResources/absenceManagers' || path == '/humanResources/teachers') && (
                        <a
                            href={`/humanResources/create/${addUserLink[path]}`} // Plain anchor link for Laravel route
                            className="px-4 py-2 rounded-lg font-medium text-sm
                            bg-purple-600 text-white hover:bg-purple-700
                            dark:bg-purple-500 dark:hover:bg-purple-600
                            transition-colors duration-200"
                        >
                            Add New
                        </a>
                    )}
                </nav>

                {children}
            </div>

         </Layout>
        
    );
}
