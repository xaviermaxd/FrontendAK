import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinarioService } from '../../services/veterinario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-veterinario',
  templateUrl: './editar-veterinario.component.html',
  styleUrls: ['./editar-veterinario.component.css']
})
export class EditarVeterinarioComponent {
  veterinarioForm: FormGroup;
  fotoVeterinario: File | null = null;
  fotoDNI: File | null = null;
  curriculumVitae: File | null = null;
  fotoVeterinarioURL: string | ArrayBuffer | null = 'http://localhost:3000/akfotos/default.png'; // URL de la imagen por defecto

  constructor(
    public dialogRef: MatDialogRef<EditarVeterinarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private veterinarioService: VeterinarioService
  ) {
    this.veterinarioForm = this.fb.group({
      Nombre: [data.Nombre, Validators.required],
      ApellidoPaterno: [data.ApellidoPaterno],
      ApellidoMaterno: [data.ApellidoMaterno, Validators.required],
      Especialidad: [data.Especialidad, Validators.required],
      Telefono: [data.Telefono, Validators.required],
      CorreoElectronico: [data.CorreoElectronico, Validators.required],
      DNI: [data.DNI, Validators.required],
      Rol: [data.Rol, Validators.required]
    });

    if (data.FotoVeterinario) {
      this.fotoVeterinarioURL = `http://localhost:3000/akfotos/${data.FotoVeterinario}`;
    }
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
      } else if (fileType === 'curriculumVitae') {
        this.curriculumVitae = file;
      }
    }
  }

  guardar(): void {
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
      this.veterinarioService.updateVeterinario(this.data.VeterinarioID, formData).subscribe(() => {
        Swal.fire('Actualizado', 'El veterinario ha sido actualizado.', 'success');
        this.dialogRef.close(true);
      }, error => {
        Swal.fire('Error', 'Hubo un problema al actualizar el veterinario.', 'error');
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();  // Cierra el diálogo sin enviar ningún dato
  }
}
