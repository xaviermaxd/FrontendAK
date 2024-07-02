// components/estadisticas/estadisticas.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListaProblemasService } from '../../services/lista-problemas.service';
import { ReservaService } from '../../services/reserva.service';
import { ExamenesConsultasService } from '../../services/examenesConsultas.service';
import { EventosService } from '../../services/eventosMedicos.service';
import * as moment from 'moment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions
} from "ng-apexcharts";
import { Problema } from '../../models/problema.model';
import { Examen } from '../../models/examen.model'; // Asegúrate de crear e importar esta interfaz

export type ProblemasChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  plotOptions: ApexPlotOptions;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  filterForm: FormGroup;
  problemasFilterForm: FormGroup;
  examenesFilterForm: FormGroup;
  eventosFilterForm: FormGroup; // Agregado para el nuevo gráfico
  chartOptions: ChartOptions;
  problemasChartOptions: ProblemasChartOptions;
  examenesChartOptions: ProblemasChartOptions;
  eventosChartOptions: ProblemasChartOptions; // Agregado para el nuevo gráfico

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private listaProblemasService: ListaProblemasService,
    private examenesConsultasService: ExamenesConsultasService,
    private eventosService: EventosService // Inyectar el servicio
  ) {
    const fechaInicio = '2024-01-01';
    const fechaFin = '2028-12-31';

    this.filterForm = this.fb.group({
      fechaInicio: [fechaInicio],
      fechaFin: [fechaFin]
    });

    this.problemasFilterForm = this.fb.group({
      fechaInicio: [fechaInicio],
      fechaFin: [fechaFin]
    });

    this.examenesFilterForm = this.fb.group({
      fechaInicio: [fechaInicio],
      fechaFin: [fechaFin]
    });

    this.eventosFilterForm = this.fb.group({ // Formulario agregado para el nuevo gráfico
      fechaInicio: [fechaInicio],
      fechaFin: [fechaFin],
      tipoEvento: ['todos'] // Inicializar con 'todos'
    });

    this.chartOptions = {
      series: [
        {
          name: "Reservas",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Estadísticas de Reservas"
      },
      xaxis: {
        categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#03A9F4'],
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    };

    this.problemasChartOptions = {
      series: [
        {
          name: "Problemas",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Estadísticas de Problemas por Sistema"
      },
      xaxis: {
        categories: []
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#03A9F4'],
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    };

    this.examenesChartOptions = {
      series: [
        {
          name: "Exámenes",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Estadísticas de Exámenes Médicos Solicitados"
      },
      xaxis: {
        categories: []
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#03A9F4'],
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    };

    this.eventosChartOptions = {
      series: [
        {
          name: "Eventos",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Estadísticas de Eventos"
      },
      xaxis: {
        categories: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#03A9F4'],
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    };
  }

  ngOnInit(): void {
    this.filterReservas();
    this.filterProblemas();
    this.filterExamenes();
    this.filterEventos(); // Agregado para inicializar el nuevo gráfico
  }

  filterReservas(): void {
    const fechaInicio = this.filterForm.value.fechaInicio ? moment(this.filterForm.value.fechaInicio).format('YYYY-MM-DD') : '';
    const fechaFin = this.filterForm.value.fechaFin ? moment(this.filterForm.value.fechaFin).format('YYYY-MM-DD') : '';

    this.reservaService.getEstadisticasReservas(fechaInicio, fechaFin).subscribe(
      (data) => {
        this.updateChart(data);
      },
      (error) => {
        console.error('Error al obtener las estadísticas de reservas', error);
      }
    );
  }

  updateChart(data: any): void {
    this.chartOptions.series = [{
      name: 'Reservas',
      data: [
        data.Lunes || 0,
        data.Martes || 0,
        data.Miércoles || 0,
        data.Jueves || 0,
        data.Viernes || 0,
        data.Sábado || 0,
        data.Domingo || 0
      ]
    }];
  }

  filterProblemas(): void {
    const fechaInicio = this.problemasFilterForm.value.fechaInicio ? moment(this.problemasFilterForm.value.fechaInicio).format('YYYY-MM-DD') : '';
    const fechaFin = this.problemasFilterForm.value.fechaFin ? moment(this.problemasFilterForm.value.fechaFin).format('YYYY-MM-DD') : '';

    this.listaProblemasService.getListaProblemasByFecha(fechaInicio, fechaFin).subscribe(
      (data: Problema[]) => {
        this.updateProblemasChart(data);
      },
      (error) => {
        console.error('Error al obtener las estadísticas de problemas', error);
      }
    );
  }

  updateProblemasChart(data: Problema[]): void {
    const nombres = data.map((item: Problema) => item.nombre);
    const counts = data.map((item: Problema) => item.count);

    this.problemasChartOptions.series = [{
      name: 'Problemas',
      data: counts
    }];

    this.problemasChartOptions.xaxis = {
      categories: nombres
    };
  }

  filterExamenes(): void {
    const fechaInicio = this.examenesFilterForm.value.fechaInicio ? moment(this.examenesFilterForm.value.fechaInicio).format('YYYY-MM-DD') : '';
    const fechaFin = this.examenesFilterForm.value.fechaFin ? moment(this.examenesFilterForm.value.fechaFin).format('YYYY-MM-DD') : '';

    this.examenesConsultasService.getExamenesConsultasByFecha(fechaInicio, fechaFin).subscribe(
      (data: Examen[]) => {
        this.updateExamenesChart(data);
      },
      (error) => {
        console.error('Error al obtener las estadísticas de exámenes médicos', error);
      }
    );
  }

  updateExamenesChart(data: Examen[]): void {
    const nombres = data.map((item: Examen) => item.nombre);
    const counts = data.map((item: Examen) => item.count);

    this.examenesChartOptions.series = [{
      name: 'Exámenes',
      data: counts
    }];

    this.examenesChartOptions.xaxis = {
      categories: nombres
    };
  }

  filterEventos(): void { // Método agregado para el nuevo gráfico
    const fechaInicio = this.eventosFilterForm.value.fechaInicio ? moment(this.eventosFilterForm.value.fechaInicio).format('YYYY-MM-DD') : '';
    const fechaFin = this.eventosFilterForm.value.fechaFin ? moment(this.eventosFilterForm.value.fechaFin).format('YYYY-MM-DD') : '';
    const tipoEvento = this.eventosFilterForm.value.tipoEvento;

    this.eventosService.getEventosAgrupadosPorDia(fechaInicio, fechaFin, tipoEvento).subscribe(
      (data) => {
        this.updateEventosChart(data);
      },
      (error) => {
        console.error('Error al obtener las estadísticas de eventos', error);
      }
    );
  }

  updateEventosChart(data: { dia_semana: number, count: number }[]): void { // Método agregado para actualizar el nuevo gráfico
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const conteos = Array(7).fill(0);
  
    data.forEach((evento: { dia_semana: number, count: number }) => {
      conteos[evento.dia_semana - 1] = evento.count;
    });
  
    this.eventosChartOptions.series = [{
      name: 'Eventos',
      data: conteos
    }];
  
    this.eventosChartOptions.xaxis = {
      categories: dias
    };
  }
  
}
