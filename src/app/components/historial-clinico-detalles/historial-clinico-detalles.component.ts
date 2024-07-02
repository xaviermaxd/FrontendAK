import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorialClinicoService } from '../../services/historialClinico.service';
import { HistorialClinico } from '../../models/historialClinico.model';

@Component({
  selector: 'app-historial-clinico-detalles',
  templateUrl: './historial-clinico-detalles.component.html',
  styleUrls: ['./historial-clinico-detalles.component.css']
})
export class HistorialClinicoDetallesComponent implements OnInit {
  historial!: HistorialClinico;

  constructor(
    private historialClinicoService: HistorialClinicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.historialClinicoService.getHistorialClinicoPorId(id).subscribe(historial => {
      this.historial = historial;
    });
  }
}
