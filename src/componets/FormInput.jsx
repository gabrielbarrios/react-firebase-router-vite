import { forwardRef } from "react";

const FormInput = forwardRef(({ type, placeholder, onChange, onBlur, name, children }, ref) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name} />
            {children}
            {/* Aquí renderizamos los errores del formulario */}
            {/* children es un componente FormError que recibe el error del input */}
        </>
    )
});
export default FormInput;
