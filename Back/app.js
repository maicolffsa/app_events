import express, { json, urlencoded } from 'express';
import cors from 'cors';
import passport from 'passport';

import session from 'express-session';
import cookieParser from 'cookie-parser';

import configurePassport from './config/passport.js';

import eventoRoutes from './routes/evento.routes.js';
import autenticacionRoutes from './routes/autenticacion.routes.js';
import autenticacionMobileRoutes from './routes/autenticacion_mobile.routes.js';

const allowedOrigins = ['*'];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use('/autenticacion', autenticacionRoutes);
app.use('/auth', autenticacionMobileRoutes);
app.use('/evento', eventoRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola mundo hahaha!');
});

app.get('/perfil', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Bienvenido a tu perfil');
  } else {
    res.status(401).json({ error: 'Debes iniciar sesión para acceder a esta página' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`La aplicación está en funcionamiento en el puerto ${port}`);
});