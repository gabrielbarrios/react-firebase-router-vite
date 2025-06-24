export const erroresFirebase = (code) => {
    
    switch (code) {
        case 'auth/email-already-in-use':
            return {
                code: "email",
                message: "El correo electrónico ya está en uso. Por favor, utiliza otro."
            }
            break;
        case 'auth/invalid-email':
            return {
                code: "email",
                message: "El correo electrónico no es válido. Por favor, verifica el formato."
            }
            break;
        case 'auth/user-not-found':
            return {
                code: "email",
                message: "El usuario no existe. Por favor, verifica el correo electrónico."
            }
            break;
        case 'auth/wrong-password':
            return {
                code: "password",
                message: "La contraseña es incorrecta. Por favor, inténtalo de nuevo."
            }
            break;
        case 'auth/invalid-credential':
            return {
                code: "email",
                message: "Credenciales invalidas"
            }
        default:
            return {
                code: "email",
                message: "Ha ocurrido un error desconocido. Por favor, inténtalo de nuevo más tarde."
            }
            break;

        // Aquí podrías mostrar un mensaje de error al usuario
    }
}




