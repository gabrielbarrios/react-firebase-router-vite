import { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const Navigate = useNavigate();
    // Aquí definimos los estados para email y password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { registerUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("le diste a submit " + email + " " + password);
        try {
            // Aquí llamas a la función de registro del contexto
            await registerUser(email, password);
            Navigate('/');
        } catch (error) {
            console.error("Error al registrar:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }


    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} placeholder="Ingrese Email" onChange={e => setEmail(e.target.value)} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} placeholder="Ingrese Password" onChange={e => setPassword(e.target.value)} required />

                <button type="submit">Register</button>
                <button type="submit">Ya tienes cuenta? Ingresa</button>
            </form>
        </>
    );
}
export default Register;
