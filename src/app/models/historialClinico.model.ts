// src/app/models/historial-clinico.model.ts

import { Veterinario } from './veterinario.model';
import { Mascota } from './mascota.model';

export class HistorialClinico {
    constructor(
        public HistorialID: number,
        public MascotaID: number,
        public VeterinarioID: number,
        public Fecha: Date,
        public MotivoConsulta: string,
        public Peso: number,
        public Temperatura: number,
        public FrecuenciaCardiaca: number,
        public FrecuenciaRespiratoria: number,
        public CondicionCorporal: string,
        public Dieta: string,
        public EnfermedadesPrevias: string,
        public Esterilizado: boolean,
        public NumeroPartos: number,
        public CirugiasPrevias: string,
        public EsquemaVacunal: string,
        public UltimaDesparasitacion: string,
        public TratamientosRecientes: string,
        public ViajesRecientes: string,
        public ViveConOtrosAnimales: boolean,
        public ComportamientoAnimal: string,
        public DiagnosticoPresuntivo: string,
        public PlanTerapeutico: string,
        public Evolucion: string,
        public ProximoControl: Date,
        public ObservacionesGenerales: string,
        public ExamenFisicoDetalles: string,
        public ListaProblemas: string,
        public ListaDiagnosticosDiferenciales: string,
        public ExamenesComplementariosResultados: string,
        public Pronostico: string,
        public Habilitado: number,
        public Mascota: Mascota,
        public Veterinario: Veterinario
    ) {}
}
