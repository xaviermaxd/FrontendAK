import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaMedicaService } from '../../services/consulta-medica.service';
import { MotivoConsultaService } from '../../services/motivo-consulta.service';
import { ListaProblemasService } from '../../services/lista-problemas.service';
import { ExamenesConsultasService } from '../../services/examenesConsultas.service';
import { ConsultaMedica } from '../../models/consultaMedica.model';
import { MotivoConsulta } from '../../models/motivoConsulta.model';
import { ListaProblemas } from '../../models/listaProblemas.model';
import { ExamenesConsultas } from '../../models/examenesConsultas.model';

@Component({
  selector: 'app-consulta-medica-detalles',
  templateUrl: './consulta-medica-detalles.component.html',
  styleUrls: ['./consulta-medica-detalles.component.css']
})
export class ConsultaMedicaDetallesComponent implements OnInit {
  consultaMedica!: ConsultaMedica;
  motivosConsulta: MotivoConsulta[] = [];
  listaProblemas: ListaProblemas[] = [];
  examenesConsultas: ExamenesConsultas[] = [];

  constructor(
    private route: ActivatedRoute,
    private consultaMedicaService: ConsultaMedicaService,
    private motivoConsultaService: MotivoConsultaService,
    private listaProblemasService: ListaProblemasService,
    private examenesConsultasService: ExamenesConsultasService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.consultaMedicaService.getConsultaMedicaById(id).subscribe(consultaMedica => {
      this.consultaMedica = consultaMedica;
      this.cargarMotivosConsulta(id);
      this.cargarListaProblemas(id);
      this.cargarExamenesConsultas(id);
    });
  }

  cargarMotivosConsulta(consultaMedicaId: number): void {
    this.motivoConsultaService.getMotivoConsultaByConsultaMedicaId(consultaMedicaId).subscribe(motivos => {
      this.motivosConsulta = motivos;
    });
  }

  cargarListaProblemas(consultaMedicaId: number): void {
    this.listaProblemasService.getListaProblemasByConsultaMedicaId(consultaMedicaId).subscribe(problemas => {
      this.listaProblemas = problemas;
    });
  }

  cargarExamenesConsultas(consultaMedicaId: number): void {
    this.examenesConsultasService.getExamenesConsultasByConsultaMedicaId(consultaMedicaId).subscribe(examenes => {
      this.examenesConsultas = examenes;
    });
  }

  onFileSelected(event: any, examenId: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.examenesConsultasService.uploadInforme(examenId, file).subscribe(() => {
        this.cargarExamenesConsultas(this.consultaMedica.id);
      }, error => {
        console.error('Error al subir el informe:', error);
      });
    }
  }

  verInforme(informe: string): void {
    window.open(`http://localhost:3000/akfotos/${informe}`, '_blank');
  }
}
