// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VeterinarioService } from '../../services/veterinario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private vetService: VeterinarioService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;
      this.vetService.login(usuario, contrasena).subscribe(
        response => {
          if (response && response.token) {
            // Guardar el token y redirigir sin mostrar alerta aquí
            this.router.navigateByUrl('/inicio');
          } else {
            // Solo muestra una alerta si no se recibe el token
            Swal.fire({
              icon: 'error',
              title: 'Error de autenticación',
              text: 'No se recibió un token válido.'
            });
          }
        },
        error => {
          // Mostrar alerta si hay un error de login
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: error.error.message || 'Usuario o contraseña incorrectos.'
          });
        }
      );
    } else {
      // Mostrar alerta si el formulario no es válido
      Swal.fire({
        icon: 'error',
        title: 'Datos inválidos',
        text: 'Por favor, rellena todos los campos requeridos.'
      });
    }
  }
}
