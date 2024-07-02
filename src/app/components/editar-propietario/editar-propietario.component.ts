// editar-propietario.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-propietario',
  templateUrl: './editar-propietario.component.html',
  styleUrls: ['./editar-propietario.component.css']
})
export class EditarPropietarioComponent {
  propietarioForm: FormGroup;
  foto: File | null = null;
  fotoURL: string | ArrayBuffer | null = 'http://localhost:3000/akfotos/default.png'; // URL de la imagen por defecto


  constructor(
    public dialogRef: MatDialogRef<EditarPropietarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Propietario,
    private fb: FormBuilder,
    private propietarioService: PropietarioService
  ) {
    this.propietarioForm = this.fb.group({
      Nombre: [data.Nombre, Validators.required],
      SegundoNombre: [data.SegundoNombre],  // Agregado
      ApellidoPaterno: [data.ApellidoPaterno, Validators.required],  // Agregado
      ApellidoMaterno: [data.ApellidoMaterno, Validators.required],  // Agregado
      Direccion: [data.Direccion],
      Telefono: [data.Telefono],
      CorreoElectronico: [data.CorreoElectronico],
      DNI: [data.DNI]  // Agregado
    });

    if (data.Foto) {
      this.fotoURL = `http://localhost:3000/akfotos/${data.Foto}`;
    }
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
      this.propietarioService.updatePropietario(this.data.PropietarioID, formData).subscribe(() => {
        Swal.fire('Actualizado', 'El propietario ha sido actualizado.', 'success');
        this.dialogRef.close(this.propietarioForm.value);
      }, error => {
        Swal.fire('Error', 'Hubo un problema al actualizar el propietario.', 'error');
      });
    }
  }
}
