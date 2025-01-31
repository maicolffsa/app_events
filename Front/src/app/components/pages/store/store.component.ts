import { Component, inject } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { LoginService } from '../../../services/login/login.service';
import { FormsModule } from '@angular/forms';
import { map, Observable} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../shared/components/modals/delete/delete.component';


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [FormsModule, AsyncPipe, MatButtonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {

  eventos$!: Observable<any[]>;
  nuevoEvento: any = {};
  editando: boolean = false;
  eventoEditado: any = {};
  mostrarFormularioCrear: boolean = false;
  esUsuarioPermitido: boolean = false;
  mensajeError: string = '';
  mostrarMensajeError: boolean = false;
  errorCreacion: string = '';
  errorEdicion: boolean = false;
  mostrarBotonEliminar: boolean = true;
  
  // private unsubscribe$ = new Subject<void>();

  private storeSvc= inject (StoreService)
  private loginSvc= inject (LoginService)
  dialog = inject(MatDialog)


  ngOnInit() {
    this.eventos$ = this.storeSvc.getListaEventos().pipe(
      map(data => data.map(evento => ({ ...evento, cantidadSeleccionada: 1, eventoAgregado: false })))
    );

    const correoUsuario = this.loginSvc.obtenerCorreoUsuarioAutenticado();
    this.esUsuarioPermitido = correoUsuario != null;
  }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }



  private limpiarMensajeErrorDespuesDeDelay(): void {
    setTimeout(() => {
      this.mensajeError = '';
    }, 5000);
  }

  editarEvento(): void {
    if (!this.eventoEditado.nombre || !this.eventoEditado.descripcion || !this.eventoEditado.precio || !this.eventoEditado.stock || !this.eventoEditado.imagen_url) {
      this.errorEdicion = true;

      setTimeout(() => {
        this.errorEdicion = false;
      }, 5000);

      return;
    }

    const camposEditados: any = {
      nombre: this.eventoEditado.nombre,
      descripcion: this.eventoEditado.descripcion,
      precio: this.eventoEditado.precio,
      stock: this.eventoEditado.stock,
      imagen_url: this.eventoEditado.imagen_url
    };

    this.storeSvc.editEvento(this.eventoEditado.id, camposEditados).
    // pipe(
    //   takeUntil(this.unsubscribe$)
    // ).
    subscribe({
      next: () => {
        this.eventos$ = this.eventos$.pipe(
          map(eventos => eventos.map(p => p.id === this.eventoEditado.id ? { ...p, ...camposEditados } : p))
        );
        this.editando = false;
        this.eventoEditado = {};
      },
      error: error => {
        console.error('Error al editar el evento', error);
      }
    });
  }

  iniciarCreacion(): void {
    this.mostrarFormularioCrear = true;
    this.nuevoEvento = {};
  }

  UsuarioPermitido(): boolean {
    const correoUsuario = this.loginSvc.obtenerCorreoUsuarioAutenticado();
    return correoUsuario !== null;
  }

  cancelarCreacion(): void {
    this.mostrarFormularioCrear = false;
    this.nuevoEvento = {};
  }

  iniciarEdicion(evento: any): void {
    this.editando = true;
    this.eventoEditado = { ...evento };
    this.mostrarBotonEliminar = false;
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.eventoEditado = {};
    this.mostrarBotonEliminar = true;
  }

  eliminarEvento(idEvento: number): void {
  const dialogRef = this.dialog.open(DeleteComponent);
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.storeSvc.deleteEvento(idEvento).subscribe({
        next: () => {
          this.eventos$ = this.eventos$.pipe(
            map(eventos => eventos.filter(p => p.id !== idEvento))
          );
          console.log('Evento eliminado correctamente');
        },
        error: error => {
          console.error('Error al eliminar el evento', error);
        }
      });
    }
  });
}

  crearEvento(): void {
    if (!this.nuevoEvento.nombre || !this.nuevoEvento.descripcion || !this.nuevoEvento.precio || !this.nuevoEvento.stock || !this.nuevoEvento.imagen_url) {
      this.errorCreacion = 'Todos los campos son obligatorios';

      setTimeout(() => {
        this.errorCreacion = '';
      }, 5000);
      return;
    }

    this.storeSvc.createEvento(this.nuevoEvento).
    // pipe(
    //   takeUntil(this.unsubscribe$)
    // ).
    subscribe({
      next: eventoCreado => {
        this.eventos$ = this.eventos$.pipe(
          map(eventos => [...eventos, eventoCreado])
        );
        this.mostrarFormularioCrear = false;
        this.nuevoEvento = {};
      },
      error: error => {
        console.error('Error al crear el evento', error);
      }
    });
  }

  guardarCambios(): void {
    if (this.editando) {
      this.editarEvento();
    } else {
      this.storeSvc.createEvento(this.eventoEditado).
      // pipe(
      //   takeUntil(this.unsubscribe$)
      // ).
      subscribe({
        next: eventoCreado => {
          this.eventoEditado = {};
        },
        error: error => {
          console.error('Error al crear el evento', error);
        }
      });
    }
  }
}