import {  Component, inject } from '@angular/core';
import { Profile} from '../../../interfaces/profile/profile';
import { DatosRegistro } from '../../../interfaces/login/login';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';
import { LoginService } from '../../../services/login/login.service';
import { CurrencyPipe, DatePipe, } from '@angular/common';
import {  FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, FormsModule, MatButtonModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  idUsuario: number | null = null;
  datosPerfil: Profile = {
    nombre: '',
    apellidos: '',
    correo_electronico: '',
    direccion: '',
    telefonos: []
  };
  historialPedidos: any[] = [];

  nuevosDatos: Partial<DatosRegistro> = {
    contrasenya: '',
    direccion: '',
    numero: []
  };

  nuevoTelefono: number | null = null;
  editandoContrasenya = false;
  editandoDireccion = false;
  editandoTelefono = false;
  mostrarMensajeEditadoContrasenya = false;
  mostrarMensajeEditadoDireccion = false;
  mostrarMensajeEditadoTelefonos = false;
  telefonos: number[] = [];
  telefono: number | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private perfilService = inject(ProfileService);
  public autenticacionService = inject(LoginService);

  ngOnInit() {
    const idUsuarioString = this.route.snapshot.paramMap.get('id');

    if (idUsuarioString !== null) {
      this.idUsuario = +idUsuarioString;

      if (!isNaN(this.idUsuario)) {
        this.obtenerDatosUsuario(this.idUsuario);
      } else {
        console.log('ID de usuario no válido. No se pueden obtener datos del perfil.');
      }
    } else {
      console.log('No se proporcionó un ID de usuario en la ruta. No se pueden obtener datos del perfil.');
    }
  }

  habilitarEdicion(campo: string) {
    if (campo === 'contrasenya') {
      this.editandoContrasenya = true;
    } else if (campo === 'direccion') {
      this.editandoDireccion = true;
    } else if (campo === 'telefonos') {
      this.editandoTelefono = true;
    }
  }

  guardarEdicion(campo: string) {
    if (campo === 'contrasenya') {
      this.editandoContrasenya = false;
      this.mostrarMensajeEditadoContrasenya = true;
      setTimeout(() => {
        this.mostrarMensajeEditadoContrasenya = false;
      }, 2000);
    } else if (campo === 'direccion') {
      // Actualizar sólo la dirección, manteniendo los otros campos
      this.datosPerfil.direccion = this.nuevosDatos.direccion ?? this.datosPerfil.direccion;
      this.nuevosDatos.numero = this.datosPerfil.telefonos.map(t => parseInt(t.numero));
      this.editandoDireccion = false;
      this.mostrarMensajeEditadoDireccion = true;
      setTimeout(() => {
        this.mostrarMensajeEditadoDireccion = false;
      }, 2000);
    }
  
    this.editarPerfil();
  }

  cancelarEdicion() {
    this.editandoContrasenya = false;
    this.editandoDireccion = false;
    this.editandoTelefono = false;
  }


 obtenerDatosUsuario(idUsuario: number) {
  console.log('Intentando obtener datos del perfil y historial de pedidos');
  this.perfilService.obtenerDatosUsuario(idUsuario).subscribe({
    next: (response: Profile) => {
      console.log('Datos del perfil después de la edición:', response);
      this.datosPerfil = response;
      this.nuevosDatos = { 
        ...this.datosPerfil,
        contrasenya: '' // Asegurando que el campo contrasenya se inicializa vacío
      };
      
    },
    error: (error) => {
      console.error('Error al obtener datos del perfil', error);
      if (error.status === 401) {
        console.log('Usuario no autenticado. Redirigir a la página de inicio de sesión');
        this.router.navigate(['']);
      } else {
        console.log('Otro tipo de error. Puedes manejarlo aquí.');
        console.log('Error completo:', error);
      }
    }
  });
}

  editarPerfil() {
    if (this.idUsuario === null || isNaN(this.idUsuario)) {
      console.error('ID de usuario no válido. No se puede editar el perfil.');
      return;
    }
    const idUsuario = this.idUsuario;
    const datosActualizados = {
      contrasenya: this.nuevosDatos.contrasenya,
      direccion: this.nuevosDatos.direccion ?? '',
      numero: this.telefonos
    };
    this.perfilService.editarPerfil(idUsuario, datosActualizados).subscribe({
      next: (response) => {
        console.log('Perfil actualizado exitosamente', response);
        this.datosPerfil = {
          ...this.datosPerfil,
          direccion: datosActualizados.direccion,
          telefonos: datosActualizados.numero.map(num => ({ numero: num.toString() }))
        };
      },
      error: (error) => {
        console.error('Error al actualizar el perfil', error);
      }
    });
  }
}   