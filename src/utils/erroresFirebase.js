export const erroresFirebase = (code) => {
    
    switch (code) {
        case 'auth/email-already-in-use':
            return "El correo electrónico ya está en uso.";
            break;
        case 'auth/invalid-email':
            return "El correo electrónico no es válido.";
            break;
        case 'auth/user-not-found':
            return "No se encontró ningún usuario con este correo electrónico.";
            break;
        case 'auth/wrong-password':
            return "La contraseña es incorrecta.";
            break;
        default:
            return "Error desconocido al registrar:", code;
            break;

        // Aquí podrías mostrar un mensaje de error al usuario
    }
}




