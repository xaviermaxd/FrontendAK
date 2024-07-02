// src/app/components/menu/menu.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VeterinarioService } from '../../services/veterinario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  rolUsuario?: number;
  showMenu: { [key: string]: boolean } = {};

  constructor(private authService: AuthService, private router: Router, private vetService: VeterinarioService) {}

  ngOnInit(): void {
    this.rolUsuario = this.vetService.getUsuarioRol();  // Obtiene el rol al inicializar
  }

  logout() {
    this.vetService.logout(); // Limpia el token de la sesión
    this.router.navigate(['/login']); // Redirige al usuario al login
  }

  toggleSubMenu(menu: string) {  // Añadir esto
    this.showMenu[menu] = !this.showMenu[menu];
  }
}
