import { ChangeDetectorRef, Component, effect, inject, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../../services/login/login.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { LogoutComponent } from '../modals/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatBadgeModule, MatIcon, LogoutComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showMenu = false;
  estaAutenticado: boolean = false;
  idUsuario: number | null = null;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private autenticacionService: LoginService = inject(LoginService);
  dialog = inject(MatDialog)

  constructor() {
    effect(() => {
      
      this.estaAutenticado = this.autenticacionService.estaAutenticadoSignal();

     
      if (this.estaAutenticado) {
        this.idUsuario = this.autenticacionService.obtenerIdUsuarioAutenticado();
      } else {
        this.idUsuario = null;
      }
      this.cdr.detectChanges(); 
    });
  }

  ngOnInit(): void {
    this.estaAutenticado = this.autenticacionService.estaAutenticado();
    this.idUsuario = this.autenticacionService.obtenerIdUsuarioAutenticado();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  cerrarSesion() {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.autenticacionService.cerrarSesion().subscribe(() => {
          console.log('Sesión cerrada correctamente.');
          this.estaAutenticado = false;
          this.idUsuario = null;
          this.cdr.detectChanges();
        });
      }
    });
  }
}