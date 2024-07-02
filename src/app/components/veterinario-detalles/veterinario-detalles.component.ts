import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../models/veterinario.model';
import { EditarVeterinarioComponent } from '../editar-veterinario/editar-veterinario.component';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-veterinario-detalles',
  templateUrl: './veterinario-detalles.component.html',
  styleUrls: ['./veterinario-detalles.component.css']
})
export class VeterinarioDetallesComponent implements OnInit {
  veterinario!: Veterinario;
  archivoActual: SafeResourceUrl | null = null;
  tipoArchivoActual: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService,
    private dialog: MatDialog,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargarVeterinario();
  }

  cargarVeterinario(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.veterinarioService.getVeterinario(id).subscribe(veterinario => {
      this.veterinario = veterinario;
    }, error => {
      Swal.fire('Error', 'Veterinario no encontrado', 'error');
    });
  }

  editarVeterinario(veterinario: Veterinario): void {
    const dialogRef = this.dialog.open(EditarVeterinarioComponent, {
      width: '840px',
      data: veterinario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarVeterinario();  // Recarga los datos después de editar
        Swal.fire('Actualizado', 'El veterinario ha sido actualizado.', 'success');
      }
    });
  }

  eliminarVeterinario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.veterinarioService.deleteVeterinario(id).subscribe(() => {
          Swal.fire('Eliminado!', 'El veterinario ha sido eliminado.', 'success');
          this.router.navigate(['/veterinarios']);
        });
      }
    });
  }

  verArchivo(tipoArchivo: string): void {
    if (tipoArchivo === 'FotoDNI' && this.veterinario.FotoDNI) {
      this.archivoActual = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/akfotos/' + this.veterinario.FotoDNI);
      this.tipoArchivoActual = 'FotoDNI';
    } else if (tipoArchivo === 'CurriculumVitae' && this.veterinario.CurriculumVitae) {
      this.archivoActual = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/akfotos/' + this.veterinario.CurriculumVitae);
      this.tipoArchivoActual = 'CurriculumVitae';
    } else {
      Swal.fire('No disponible', `No hay ${tipoArchivo === 'FotoDNI' ? 'foto de DNI' : 'curriculum vitae'} disponible`, 'info');
    }
  }
}