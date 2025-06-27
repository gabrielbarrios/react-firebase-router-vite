import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../componets/FormError";
import FormInput from "../componets/FormInput";
import Title from "../componets/Title";
import Button from "../componets/Button";

const Login = () => {

    const Navigate = useNavigate();


    const { user, loginUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    // Importamos las validaciones del formulario
    const { required, patternEmail, minLength, validateTrim } = formValidate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true);
            // Aquí llamas a la función de registro del contexto
            await loginUser({ email, password });
            Navigate('/');
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            console.error("Error al registrar:", error.code);
            setError(code, {
                message: message
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Title text='Login' />
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
                <FormInput
                    type='text'
                    placeholder='Ingrese Email'
                    {...register('email', {
                        required: required,
                        pattern: patternEmail,
                    })}
                    label="Ingrese Email"
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
                <FormInput
                    type='password'
                    placeholder='Ingrese Password'
                    {...register('password', {
                        required: required,
                        minLength: minLength,
                        validate: validateTrim
                    })}
                    label="Ingrese Password"
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>

                <Button type='submit' text='Login' loading={loading} />


            </form>
        </>
    )
}

export default Login