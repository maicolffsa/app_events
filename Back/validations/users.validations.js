import * as yup from 'yup';

export let usersValidations = yup.object().shape(
    {
        nombre: yup.string()
             .required({error: "El campo Nombre no puede estar vacío"}),

        apellidos: yup.string()
             .required({error: "El campo Apellidos no puede estar vacío"}),
  
        correo_electronico: yup.string()
             .required({error: "El campo Correo no puede estar vacío"})
             .email({error: "El correo electrónico no es válido"}),

        direccion: yup.string()
             .required({error: "El campo Dirección no puede estar vacío"}),  
             
        contrasenya: yup.string()
             .required({error: "El campo Contraseña no puede estar vacío"})
    });