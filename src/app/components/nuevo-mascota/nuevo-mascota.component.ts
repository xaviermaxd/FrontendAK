import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-mascota',
  templateUrl: './nuevo-mascota.component.html',
  styleUrls: ['./nuevo-mascota.component.css']
})
export class NuevoMascotaComponent {
  form: FormGroup;
  foto: File | null = null;
  fotoURL: string | ArrayBuffer | null = 'http://localhost:3000/akfotos/default.png'; // URL de la imagen por defecto

  constructor(
    public dialogRef: MatDialogRef<NuevoMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mascotaService: MascotaService,
    private fb: FormBuilder // Inyecta FormBuilder
  ) {
    this.form = this.fb.group({
      PropietarioID: [data.PropietarioID, Validators.required],
      Nombre: ['', Validators.required],
      Especie: ['', Validators.required],
      Raza: [''],
      Sexo: ['', Validators.required],
      FechaNacimiento: [''],
      Color: [''],
      Alergias: ['']
    });
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // agregarMascota(): void {
  //   if (this.form.valid) {
  //     this.mascotaService.addMascota(this.form.value).subscribe(() => {
  //       this.dialogRef.close(true);
  //       Swal.fire('¡Éxito!', 'Mascota agregada con éxito.', 'success');
  //     }, error => {
  //       Swal.fire('¡Error!', 'Hubo un error al agregar la mascota.', 'error');
  //     });
  //   } else {
  //     Swal.fire('¡Error!', 'Por favor, completa todos los campos requeridos.', 'error');
  //   }
  // }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.foto = file;
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) {
          this.fotoURL = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  agregarMascota(): void {
    if (this.form.valid) {
      const formData = new FormData();
      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.form.value[key]);
      });
      if (this.foto) {
        formData.append('Foto', this.foto);
      }
      this.mascotaService.addMascota(formData).subscribe(() => {
        this.dialogRef.close(true);
        Swal.fire('¡Éxito!', 'Mascota agregada con éxito.', 'success');
      }, error => {
        Swal.fire('¡Error!', 'Hubo un error al agregar la mascota.', 'error');
      });
    } else {
      Swal.fire('¡Error!', 'Por favor, completa todos los campos requeridos.', 'error');
    }
  }
}