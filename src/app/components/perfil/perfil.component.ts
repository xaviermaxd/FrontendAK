import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../models/veterinario.model';
import { UpdatePasswordComponent } from '../update-password/update-password.component'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  veterinario: Veterinario | null = null;

  constructor(
    private vetService: VeterinarioService, 
    private fb: FormBuilder,
    public dialog: MatDialog // Inyecta MatDialog aquí
  ) {}

  ngOnInit(): void {
    this.vetService.getCurrentVeterinario().subscribe(vet => {
      this.veterinario = vet;
    });
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      width: '400px',
      data: { veterinario: this.veterinario } // puedes pasar datos al componente de diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado. Resultado:', result);
      // Aquí puedes manejar el resultado del diálogo, como actualizar la vista si la contraseña fue cambiada exitosamente.
    });
  }
}

