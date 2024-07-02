// vacunacion-detalles.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacunacionService } from '../../services/vacunacion.service';
import { VacunacionMedicamentoService } from '../../services/vacunacion-medicamento.service';
import { Vacunacion } from '../../models/vacunacion.model';
import { VacunacionMedicamento } from '../../models/vacunacion-medicamento.model';

@Component({
  selector: 'app-vacunacion-detalles',
  templateUrl: './vacunacion-detalles.component.html',
  styleUrls: ['./vacunacion-detalles.component.css']
})
export class VacunacionDetallesComponent implements OnInit {
  vacunacion!: Vacunacion;
  medicamentos: VacunacionMedicamento[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vacunacionService: VacunacionService,
    private vacunacionMedicamentoService: VacunacionMedicamentoService
  ) {}

  ngOnInit(): void {
    const id = this.data.id;
    this.vacunacionService.getVacunacion(id).subscribe(vacunacion => {
      this.vacunacion = vacunacion;
      this.cargarMedicamentos(id);
    });
  }

  cargarMedicamentos(vacunacionId: number): void {
    this.vacunacionMedicamentoService.getMedicamentosPorVacunacionId(vacunacionId).subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    });
  }
}
