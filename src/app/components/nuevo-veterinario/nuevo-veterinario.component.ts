import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinarioService } from '../../services/veterinario.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-veterinario',
  templateUrl: './nuevo-veterinario.component.html',
  styleUrls: ['./nuevo-veterinario.component.css']
})
export class NuevoVeterinarioComponent {
  veterinarioForm: FormGroup;
  fotoVeterinario: File | null = null;
  fotoDNI: File | null = null;
  curriculumVitae: File | null = null;
  fotoVeterinarioURL: string | ArrayBuffer | null = 'http://localhost:3000/akfotos/default.png'; // URL de la imagen por defecto
  fotoVeterinarioName: string = '';
  fotoDNIName: string = '';
  curriculumVitaeName: string = '';


  constructor(
    private fb: FormBuilder,
    private veterinarioService: VeterinarioService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NuevoVeterinarioComponent>
  ) {
    this.veterinarioForm = this.fb.group({
      Nombre: ['', Validators.required],
      Usuario: ['', Validators.required],
      Especialidad: ['', Validators.required],
      Telefono: ['', Validators.required],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      DNI: ['', Validators.required]
    });
  }



  onSubmit(): void {
    if (this.veterinarioForm.valid) {
      const formData = new FormData();
      Object.keys(this.veterinarioForm.value).forEach(key => {
        formData.append(key, this.veterinarioForm.value[key]);
      });
      if (this.fotoVeterinario) {
        formData.append('FotoVeterinario', this.fotoVeterinario);
      }
      if (this.fotoDNI) {
        formData.append('FotoDNI', this.fotoDNI);
      }
      if (this.curriculumVitae) {
        formData.append('CurriculumVitae', this.curriculumVitae);
      }
      formData.append('Contrasena', '123456');  // Contraseña por defecto
      formData.append('Rol', '1');  // Rol por defecto
      formData.append('Habilitado', 'true');  // Habilitado por defecto
  
      this.veterinarioService.createVeterinario(formData).subscribe({
        next: res => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Veterinario creado con éxito.',
            confirmButtonText: 'Cerrar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close(true);  // Cierra el diálogo
            }
          });
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear el veterinario.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al crear veterinario', err);
        }
      });
    } else {
      this.veterinarioForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos requeridos.',
        confirmButtonText: 'Cerrar'
      });
    }
  }
  

  cancelar(): void {
    this.dialogRef.close(false);
  }

  onFileSelected(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'fotoVeterinario') {
        this.fotoVeterinario = file;
        const reader = new FileReader();
        reader.onload = e => {
          if (e.target?.result) {
            this.fotoVeterinarioURL = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      } else if (fileType === 'fotoDNI') {
        this.fotoDNI = file;
        this.fotoDNIName = file.name;
      } else if (fileType === 'curriculumVitae') {
        this.curriculumVitae = file;
        this.curriculumVitaeName = file.name;
      }
    }
  }
}