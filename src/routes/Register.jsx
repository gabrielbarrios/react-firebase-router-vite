import { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Asegúrate de que este hook esté correctamente implementado

const Register = () => {

    const Navigate = useNavigate();
    const { registerUser } = useContext(UserContext);
    // Aquí definimos los estados para email y password
    /*const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");*/

    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm(); // Asegúrate de que useForm esté correctamente importado
    const onSubmit = async ({ email, password }) => {

        try {
            // Aquí llamas a la función de registro del contexto
            console.log("le diste a submit " + email + " " + password);
            await registerUser({ email, password });
            Navigate('/');
        } catch (error) {
            console.error("Error al registrar:", error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    console.error("El correo electrónico ya está en uso.");
                    setError('email', {
                        type: 'manual',
                        message: 'El correo electrónico ya está en uso.'
                    });
                    break;
                case 'auth/invalid-email':
                    console.error("El correo electrónico no es válido.");
                    setError('email', {
                        type: 'manual',
                        message: 'El correo electrónico no es válido.'
                    });
                    break;
                default:
                    console.error("Error desconocido al registrar:", error.code);
                    setError('email', {
                        type: 'manual',
                        message: 'Ocurrió un error al registrar. Inténtalo de nuevo más tarde.'
                    });
                    break;

                // Aquí podrías mostrar un mensaje de error al usuario
            }
        }
    }


    /*const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("le diste a submit " + email + " " + password);
        try {
            // Aquí llamas a la función de registro del contexto
            await registerUser(email, password);
            Navigate('/');
        } catch (error) {
            console.error("Error al registrar:", error.code);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }*/


    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    placeholder="Ingrese Email"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required'
                        },
                        pattern:
                        {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email format'
                        },
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder="Ingrese Password"
                    {...register('password', {
                        required: true,
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long'
                        },
                        validate: {
                            trim: (v) => v.trim() !== '' || 'Password cannot be empty',    //trim es un nombre de validación personalizado
                            noSpaces: (v) => !/\s/.test(v) || 'Password cannot contain spaces' //noSpaces es un nombre de validación personalizado
                        }
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <input
                    type="password"
                    placeholder="Ingrese Password"
                    {...register('repassword', {
                        required: true,
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long'
                        },
                        validate: {
                            equals: (v) => v === getValues('password') || 'The passwords do not match',
                        }
                    })}
                />
                {errors.repassword && <span>{errors.repassword.message}</span>}

                <button type="submit">Register</button>
            </form>
        </>
    );
}
export default Register;
