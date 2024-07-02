import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propietario } from '../../models/propietario.model';
import { Mascota } from '../../models/mascota.model';
import { PropietarioService } from '../../services/propietario.service';
import { MascotaService } from '../../services/mascota.service';
import { MatDialog } from '@angular/material/dialog';
import { NuevoMascotaComponent } from '../nuevo-mascota/nuevo-mascota.component';
import { EditarPropietarioComponent } from '../editar-propietario/editar-propietario.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-propietario-detalles',
  templateUrl: './propietario-detalles.component.html',
  styleUrls: ['./propietario-detalles.component.css']
})
export class PropietarioDetallesComponent implements OnInit {
  propietario!: Propietario;
  mascotas!: Mascota[];
  page = 1;
  pageSize = 4;
  totalItems = 0;

  constructor(
    private route: ActivatedRoute,
    private propietarioService: PropietarioService,
    private mascotaService: MascotaService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.propietarioService.getPropietario(id).subscribe(propietario => {
      this.propietario = propietario;
      this.getMascotas();
    });
  }

  getPropietario(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.propietarioService.getPropietario(id).subscribe(propietario => this.propietario = propietario);
  }

  getMascotas(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.mascotaService.getMascotasPorPropietario(id, this.page, this.pageSize).subscribe(response => {
      this.mascotas = response.data;
      this.totalItems = response.pagination.totalItems;
    });
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(NuevoMascotaComponent, {
      width: '720px',
      data: { PropietarioID: this.propietario.PropietarioID }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMascotas();
        Swal.fire('¡Éxito!', 'Mascota agregada con éxito.', 'success');
      }
    });
  }
  

  deletePropietario(id: number): void {
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
        this.propietarioService.deletePropietario(id).subscribe(() => {
          Swal.fire('Eliminado', 'El propietario ha sido eliminado.', 'success');
          // Aquí puedes redirigir al usuario a la página de lista de propietarios
          this.router.navigate(['/propietarios']);
        });
      }
    });
  }
  
  editarPropietario(propietario: Propietario): void {
    const dialogRef = this.dialog.open(EditarPropietarioComponent, {
      width: '840px',
      data: propietario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza la información en la interfaz de usuario con los nuevos datos
        this.getPropietario();  // Refresca los datos del propietario actualizados
        Swal.fire('Actualizado', 'El propietario ha sido actualizado.', 'success');
      }
    });
  }
  
  verPerfilMascota(id: number): void {
    this.router.navigate(['/mascota-detalles', id]); 
  }
  
  calcularEdad(fechaNacimiento: Date): string {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad > 1 ? `${edad} años` : `${edad} año`;
  }
  

}