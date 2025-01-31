import { Injectable, inject, signal } from '@angular/core';
import { Usuario, Login, DatosRegistro, RespuestaLogin } from '../../interfaces/login/login';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.backendUrl}/autenticacion`;

  private usuarioAutenticado: Usuario | null = null;

  estaAutenticadoSignal = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private router = inject(Router)
  private http = inject(HttpClient)
  private cookieService = inject(CookieService)



  registro(usuario: DatosRegistro): Observable<any> {
    this.isLoading.set(true);
    this.error.set(null);
    return this.http.post(`${this.apiUrl}/registro`, usuario).pipe(
      tap((response: any) => {
        this.actualizarDatosAutenticacion(response.usuario);
        this.isLoading.set(false);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Error al registrar el usuario'))
    );
  }

  iniciarSesion(credenciales: Login): Observable<RespuestaLogin> {
    this.isLoading.set(true);
    this.error.set(null);
    return this.http.post<RespuestaLogin>(`${this.apiUrl}/inicio-sesion`, credenciales).pipe(
      tap((data) => {
        this.actualizarDatosAutenticacion(data.usuario);
        this.isLoading.set(false);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Error al iniciar sesión'))
    );
  }

  cerrarSesion(): Observable<any> {
    this.usuarioAutenticado = null;
    this.estaAutenticadoSignal.set(false);

    const cerrarSesionUrl = `${this.apiUrl}/cerrar-sesion`;
    this.cookieService.delete('connect.sid', '/');
    this.cookieService.delete('sesion_usuario', '/');
    this.router.navigate(['/login']);
    localStorage.removeItem('token');

    return this.http.post(cerrarSesionUrl, {}).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Error al cerrar sesión'))
    );
  }

  decodeToken(token: string): any {
    // Dividir el token en tres partes: header, payload y signature
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      throw new Error('El token no tiene el formato correcto');
    }
  
    // Decodificar la parte del payload (segunda parte) desde base64 URL
    const payload = parts[1];
  
    // Asegurarse de que el padding es correcto para base64
    const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
    const base64 = base64Url + '='.repeat((4 - base64Url.length % 4) % 4); // Ajuste de padding
  
    // Decodificar de base64 a JSON
    const decodedPayload = atob(base64);
    
    // Convertir a objeto JSON
    return JSON.parse(decodedPayload);
  }

  redirigirALogin(): void {
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    const token = localStorage.getItem('token');

  if(token != null){
    this.estaAutenticadoSignal.set(true);
  }
  else{
    this.estaAutenticadoSignal.set(false);
  }
    return this.estaAutenticadoSignal();
  }



  obtenerIdUsuarioAutenticado(): number | null {

    const token = localStorage.getItem('token');

      const decoded = token ? this.decodeToken(token) : null;
     // console.log("dec",decoded.id);

    
    return decoded?.id;
  }

  obtenerCorreoUsuarioAutenticado(): string | null {
    return this.usuarioAutenticado ? this.usuarioAutenticado.correo_electronico : null;
  }

  private handleError(error: HttpErrorResponse, defaultMessage: string): Observable<never> {
    console.error('Error en la solicitud:', error);
    let errorMessage = defaultMessage;
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error del lado del cliente. Por favor, inténtalo de nuevo.';
    } else {
      errorMessage = `Error del lado del servidor (estado ${error.status}): ${error.error.message}`;
    }
    this.isLoading.set(false);
    this.error.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private actualizarDatosAutenticacion(usuario: Usuario): void {
    this.usuarioAutenticado = usuario;
    this.estaAutenticadoSignal.set(true);
    console.log('Signal de autenticación actualizado:', true);
  }
}