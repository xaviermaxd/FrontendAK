import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { HistorialClinicoService } from '../../services/historialClinico.service';
import { Mascota } from '../../models/mascota.model';
import { HistorialClinico } from '../../models/historialClinico.model';
import { MatDialog } from '@angular/material/dialog';
import { EditarMascotaComponent } from '../editar-mascota/editar-mascota.component';
import { NuevoVacunacionComponent } from '../nuevo-vacunacion/nuevo-vacunacion.component';
import { NuevoDesparasitacionComponent } from '../nuevo-desparasitacion/nuevo-desparasitacion.component';
import { NuevoConsultaMedicaComponent } from '../nuevo-consulta-medica/nuevo-consulta-medica.component';
import { VacunacionDetallesComponent } from '../vacunacion-detalles/vacunacion-detalles.component';
import { EventosService } from '../../services/eventos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascota-detalles',
  templateUrl: './mascota-detalles.component.html',
  styleUrls: ['./mascota-detalles.component.css']
})
export class MascotaDetallesComponent implements OnInit {
  mascota!: Mascota;
  eventos: any[] = [];
  fechaDesde?: string;
  fechaHasta?: string;
  tipoEvento: string = '';

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private router: Router,
    public dialog: MatDialog,
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.mascotaService.getMascota(id).subscribe(mascota => {
      this.mascota = mascota;
      this.cargarEventos();
    });
  }

  cargarEventos(): void {
    this.eventosService.getEventosByMascotaId(this.mascota.MascotaID).subscribe(eventos => {
      this.eventos = eventos;
      this.filtrarEventos();
    });
  }

  filtrarEventos(): void {
    let eventosFiltrados = this.eventos;
  
    if (this.fechaDesde && this.fechaHasta) {
      const desde = new Date(this.fechaDesde);
      const hasta = new Date(this.fechaHasta);
      hasta.setHours(23, 59, 59, 999);  // Incluye toda la fecha final
  
      eventosFiltrados = eventosFiltrados.filter(evento => {
        const fechaEvento = new Date(evento.fecha);
        return fechaEvento >= desde && fechaEvento <= hasta;
      });
    }
  
    if (this.tipoEvento) {
      eventosFiltrados = eventosFiltrados.filter(evento => evento.tipo === this.tipoEvento);
    }
  
    this.eventos = eventosFiltrados.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }
  

  aplicarFiltro(): void {
    this.cargarEventos();
  }

  limpiarFiltro(): void {
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
    this.tipoEvento = '';
    this.cargarEventos();
  }

  editarMascota(): void {
    const dialogRef = this.dialog.open(EditarMascotaComponent, {
      width: '720px',
      data: this.mascota
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mascota = result;
        Swal.fire('Actualizado', 'La mascota ha sido actualizada.', 'success');
      }
    });
  }

  eliminarMascota(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotaService.deleteMascota(this.mascota.MascotaID).subscribe(() => {
          Swal.fire('Eliminado', 'La mascota ha sido eliminada.', 'success');
          this.router.navigate(['/mascotas']);
        });
      }
    });
  }

  abrirFormularioVacunacion(): void {
    const dialogRef = this.dialog.open(NuevoVacunacionComponent, {
      width: '720px',
      data: this.mascota
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Registrado', 'La vacunación ha sido registrada.', 'success');
        this.cargarEventos(); // Recargar los eventos después de registrar una vacunación
      }
    });
  }

  openNuevoDesparasitacion(): void {
    const dialogRef = this.dialog.open(NuevoDesparasitacionComponent, {
      width: '720px',
      data: this.mascota
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Registrado', 'La desparasitación ha sido registrada.', 'success');
        this.cargarEventos(); // Recargar los eventos después de registrar una desparasitación
      }
    });
  }

  abrirFormularioConsultaMedica(): void {
    const mascotaId = this.mascota.MascotaID;
    this.router.navigate(['/nuevo-consulta-medica', mascotaId]);
  }

  verConsultaMedica(consultaMedicaId: number): void {
    this.router.navigate(['/consulta-medica-detalles', consultaMedicaId]);
  }

  verVacunacion(vacunacionId: number): void {
    const dialogRef = this.dialog.open(VacunacionDetallesComponent, {
      width: '500px',
      data: { id: vacunacionId }
    });
  
    console.log(vacunacionId)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Cargado', 'Los detalles de la vacunación han sido cargados.', 'success');
      }
    });
  }

  verEvento(id: number) {
    // Lógica para ver el evento según el tipo
    const evento = this.eventos.find(e => e.id === id);
    if (evento) {
      if (evento.tipo === 'Consulta Médica') {
        this.verConsultaMedica(id);
      } else if (evento.tipo === 'Vacunación') {
        this.verVacunacion(id);
      }
    }
  }
  
}