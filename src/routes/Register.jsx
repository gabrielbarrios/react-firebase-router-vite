import { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Asegúrate de que este hook esté correctamente implementado
import { erroresFirebase } from '../utils/erroresFirebase';
import FormError from '../componets/FormError';
import { formValidate } from '../utils/formValidate';
import FormInput from '../componets/FormInput';
import Title from '../componets/Title';
import Button from "../componets/Button";

const Register = () => {

    const Navigate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    // Importamos las validaciones del formulario
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

    // Aquí definimos los estados para email y password
    /*const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");*/

    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm(); // Asegúrate de que useForm esté correctamente importado
    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true);
            // Aquí llamas a la función de registro del contexto
            await registerUser({ email, password });
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
            <Title text='Register' />
            <FormError error={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Aquí usamos FormInput que es un componente nuestro para los forms */}
                <FormInput
                    type='text'
                    placeholder='Ingrese Email'
                    {...register('email', {
                        required: required,
                        pattern: patternEmail,
                    })}
                    label="Ingresa Email"
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
                    label="Ingresa Password"
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>

                <FormInput
                    type='password'
                    placeholder='Reingrese Password'
                    {...register('repassword', {
                        required: required,
                        minLength: minLength,
                        validate: validateEquals(getValues("password"))
                    })}
                    label="Ingresa Password de nuevo"
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword} />
                </FormInput>
                <Button type='submit' text='Register' loading={loading} />

            </form>
        </>
    );
}
export default Register;
