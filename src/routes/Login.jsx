import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../componets/FormError";
import FormInput from "../componets/FormInput";

const Login = () => {

    const Navigate = useNavigate();


    const { user, loginUser } = useContext(UserContext);
    // Importamos las validaciones del formulario
    const { required, patternEmail, minLength, validateTrim } = formValidate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            // Aquí llamas a la función de registro del contexto
            await loginUser({ email, password });
            Navigate('/');
        } catch (error) {
            console.error("Error al registrar:", error.code);
            setError('firebase', {
                message: erroresFirebase(error.code)
            });
        }
    }

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
            <FormError error={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>
                <FormInput
                    type='text'
                    placeholder='Ingrese Email'
                    {...register('email', {
                        required: required,
                        pattern: patternEmail,
                    })}
                >
                    <FormError error={errors.email} />
                </FormInput>
                <label htmlFor="password">Password:</label>
                <FormInput
                    type='password'
                    placeholder='Ingrese Password'
                    {...register('password', {
                        required: required,
                        minLength: minLength,
                        validate: validateTrim
                    })}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login