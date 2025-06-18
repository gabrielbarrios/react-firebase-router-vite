import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Asegúrate de que este hook esté correctamente implementado
import { erroresFirebase } from '../utils/erroresFirebase';
import FormError from '../componets/FormError';
import { formValidate } from '../utils/formValidate';
import FormInput from '../componets/FormInput';

const Register = () => {

    const Navigate = useNavigate();
    const { registerUser } = useContext(UserContext);

    // Importamos las validaciones del formulario
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

    // Aquí definimos los estados para email y password
    /*const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");*/

    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm(); // Asegúrate de que useForm esté correctamente importado
    const onSubmit = async ({ email, password }) => {
        try {
            // Aquí llamas a la función de registro del contexto
            await registerUser({ email, password });
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
            <h1>Register</h1>
            <FormError error={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>
                {/* Aquí usamos FormInput que es un componente nuestro para los forms */}
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

                <FormInput
                    type='password'
                    placeholder='Reingrese Password'
                    {...register('repassword', {
                        required: required,
                        minLength: minLength,
                        validate: validateEquals(getValues)
                    })}
                >
                    <FormError error={errors.repassword} />
                </FormInput>

                <button type="submit">Register</button>
            </form>
        </>
    );
}
export default Register;
