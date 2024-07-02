import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../models/veterinario.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  veterinario: Veterinario | null = null;

  constructor(private vetService: VeterinarioService, private router: Router) {}



  ngOnInit() {
    this.vetService.isLoggedIn().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      } else {
        this.vetService.getCurrentVeterinario().subscribe(vet => {
          this.veterinario = vet;
        });
      }
    });
  }
}