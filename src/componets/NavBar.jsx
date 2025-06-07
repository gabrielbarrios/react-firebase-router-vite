import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";



const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <>

            {user ? (
                <>
                    <NavLink to="/">Inicio</NavLink>
                    <button onClick={() => setUser(false)}>Cerrar Sesión</button>
                </>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </>
    );
}
export default Navbar;
