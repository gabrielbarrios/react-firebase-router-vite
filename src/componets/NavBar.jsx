import { NavLink } from "react-router-dom";
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

    return (
        <>

            {user ? (
                <>
                    <NavLink to="/">Inicio</NavLink>
                    <button onClick={handleClickLogout}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login | </NavLink>
                    <NavLink to="/register">Register</NavLink>
                </>

            )}
        </>
    );
}
export default Navbar;
