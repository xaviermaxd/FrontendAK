// editar-mascota.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../models/mascota.model';
import { MascotaService } from '../../services/mascota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnInit {
  mascotaForm!: FormGroup;
  foto: File | null = null;
  fotoURL: string | ArrayBuffer | null;

  constructor(
    public dialogRef: MatDialogRef<EditarMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota,
    private fb: FormBuilder,
    private mascotaService: MascotaService
  ) {
    this.fotoURL = data.Foto ? `http://localhost:3000/akfotos/${data.Foto}` : 'http://localhost:3000/akfotos/default.png';
  }

  ngOnInit(): void {
    this.mascotaForm = this.fb.group({
      Nombre: [this.data.Nombre, Validators.required],
      Especie: [this.data.Especie, Validators.required],
      Raza: [this.data.Raza],
      Sexo: [this.data.Sexo, Validators.required],
      FechaNacimiento: [this.data.FechaNacimiento],
      Color: [this.data.Color],
      Alergias: [this.data.Alergias]
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
    if (this.mascotaForm.valid) {
      const formData = new FormData();
      Object.keys(this.mascotaForm.value).forEach(key => {
        formData.append(key, this.mascotaForm.value[key]);
      });
      if (this.foto) {
        formData.append('Foto', this.foto);
      }
      this.mascotaService.updateMascota(this.data.MascotaID, formData).subscribe(() => {
        Swal.fire('Actualizado', 'La mascota ha sido actualizada.', 'success');
        this.dialogRef.close(this.mascotaForm.value);
      }, error => {
        Swal.fire('Error', 'Hubo un problema al actualizar la mascota.', 'error');
      });
    }
  }
}