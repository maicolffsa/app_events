
import { Strategy as LocalStrategy } from 'passport-local';
import  Usuario  from '../models/usuario.js';
import { compare } from 'bcrypt';

// Configura la estrategia de autenticación local
export default function configurePassport(passport) {
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Usuario.findOne({ where: { correo_electronico: username } });

      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
  
      const passwordMatch = await compare(password, user.contrasenya);

      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
   
    const user = await Usuario.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
};
