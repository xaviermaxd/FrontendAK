import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropietarioService } from '../../services/propietario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-propietario',
  templateUrl: './nuevo-propietario.component.html',
  styleUrls: ['./nuevo-propietario.component.css']
})
export class NuevoPropietarioComponent {
  propietarioForm: FormGroup;
  foto: File | null = null;
  fotoURL: string | ArrayBuffer | null = 'http://localhost:3000/akfotos/default.png'; // URL de la imagen por defecto

  constructor(
    public dialogRef: MatDialogRef<NuevoPropietarioComponent>,
    private fb: FormBuilder,
    private propietarioService: PropietarioService // Inyecta PropietarioService
  ) {
    this.propietarioForm = this.fb.group({
      Nombre: ['', Validators.required],
      SegundoNombre: [''], 
      ApellidoPaterno: ['', Validators.required], 
      ApellidoMaterno: ['', Validators.required],
      Direccion: [''],
      Telefono: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
      DNI: ['', Validators.required]
    });
  }

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

  guardar(): void {
    if (this.propietarioForm.valid) {
      const formData = new FormData();
      Object.keys(this.propietarioForm.value).forEach(key => {
        formData.append(key, this.propietarioForm.value[key]);
      });
      if (this.foto) {
        formData.append('Foto', this.foto);
      }
      this.propietarioService.addPropietario(formData).subscribe(() => {
        this.dialogRef.close(true);
        Swal.fire('Guardado', 'El nuevo propietario ha sido guardado.', 'success');
      }, error => {
        Swal.fire('Error', 'Hubo un problema al guardar el propietario.', 'error');
      });
    } else {
      this.propietarioForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos requeridos.',
        confirmButtonText: 'Cerrar'
      });
    }
  }
}
