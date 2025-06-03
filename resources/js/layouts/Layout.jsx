import { useState , useEffect } from "react";
import SideBar from "../Components/Common/SideBar";
import { usePage , router} from "@inertiajs/react";
import DotLoader from "../Components/Loader/DotLoader";
import { ToastContainer } from "react-toastify";
import { dangerNotify, InfoNotify, successNotify } from "../Components/Common/Toast";

function Layout({children}) {
  const theme= usePage().props.theme

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.on('start', () => setLoading(true));
    router.on('finish', () => setLoading(false));

    return () => {
      router.on('start', null);
      router.on('finish', null);
    };
  }, []);

  const { flash } = usePage().props;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!shown) {
    if (flash.success) successNotify(flash.success);
    if (flash.error) dangerNotify(flash.error);
    if (flash.info) InfoNotify(flash.info);
    // if (flash.warning) toast.warn(flash.warning);
    setShown(true)
    }
  }, [flash,shown]);
 
  return (
    <div className={`App ${theme } font-mainFont`} >
      {
        loading && <DotLoader/>
      }
      <ToastContainer pauseOnHover = {false} closeButton= {false} />
      <div className=" min-h-screen bg-white bg-opacity-50 dark:bg-gray-900 text-gray-700 dark:text-gray-50 font-mainFont">
        {/* Main layout container */}
        {

          <div className="flex h-full ">
            {/* Sidebar */}
            <SideBar />
            <div className={` w-full overflow-x-hidden duration-500 peer-hover:lg:ml-56 ml-16  mx-auto `}>
                {children}
            </div>
        </div>
        }
      </div>
    </div>
  );
}

export default Layout;
