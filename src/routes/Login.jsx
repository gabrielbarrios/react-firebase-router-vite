import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const Navigate = useNavigate();
    const handleClickLogin = () => {
        setUser(true);
        Navigate('/');

    }

    const { user, setUser } = useContext(UserContext)
    return (
        <>
            <h1>Login</h1>
            <h2>
                {
                    user ? (
                        <p>Welcome back!</p>
                    ) : (
                        <p>Please log in to continue.</p>
                    )
                }
            </h2>
            <button onClick={handleClickLogin}>Acceder</button>
            <button onClick={() => setUser(false)}>Salir</button>
        </>
    )
}

export default Login