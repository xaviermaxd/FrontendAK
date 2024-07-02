import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VeterinarioService } from '../../services/veterinario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vetService: VeterinarioService,
    public dialogRef: MatDialogRef<UpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos del veterinario se pasan aquí
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordStrengthValidator(control: AbstractControl) {
    const password = control.value;
    const regexMayuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexSimbolo = /[!@#$%^&*(),.?":{}|<>]/;

    if (
      !regexMayuscula.test(password) ||
      !regexMinuscula.test(password) ||
      !regexNumero.test(password) ||
      !regexSimbolo.test(password)
    ) {
      return { weakPassword: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submitChangePassword() {
    if (this.changePasswordForm.valid) {
      this.vetService.updatePassword(
        this.data.veterinario.VeterinarioID,
        this.changePasswordForm.value.currentPassword,
        this.changePasswordForm.value.newPassword
      ).subscribe({
        next: () => {
          Swal.fire('¡Cambiada!', 'Tu contraseña ha sido actualizada.', 'success');
          this.dialogRef.close(true); // Cierra el diálogo y pasa 'true' como resultado
        },
        error: (error) => {
          Swal.fire('Error', 'No se pudo cambiar la contraseña: ' + error.message, 'error');
        }
      });
    } else {
      Swal.fire('Formulario inválido', 'Por favor, asegúrate de que las contraseñas coincidan y cumplan con todos los requisitos.', 'error');
    }
  }
}
