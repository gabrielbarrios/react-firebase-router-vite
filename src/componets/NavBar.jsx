import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

/* testing */

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const handleClickLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("Error al cerrar sesión:", error.code);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }
    const buttonBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    const buttonRed = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-1">
                    {user ? (
                        <>
                            <NavLink to="/" className={buttonBlue}>Inicio</NavLink>
                            <button onClick={handleClickLogout} className={buttonRed}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={buttonBlue}>Login</NavLink>
                            <NavLink to="/register" className={buttonBlue}>Register</NavLink>
                        </>

                    )}
                </div>

            </div>
        </nav>
    );
}
export default Navbar;
