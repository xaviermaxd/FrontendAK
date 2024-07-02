import { Laboratorio } from './laboratorio.model';
import { SustanciaActiva } from './sustancia-activa.model';
import { UsoTerapeutico } from './uso-terapeutico.model';
import { Pais } from './pais.model';
import { ViaAdministracion } from './via-administracion.model';
import { PosologiaPorEspecie } from './posologia-por-especie.model';
import { PresentacionesMedicamento } from './presentaciones-medicamento.model';

export class Medicamento {
  constructor(
    public id: number,
    public nombre: string,
    public laboratorio_id: number,
    public sustancia_id: number,
    public uso_terapeutico_id: number,
    public via_administracion_id: number,
    public pais_id?: number,
    public registro_sanitario?: string,
    public composicion?: string,
    public indicaciones?: string,
    public contraindicaciones?: string,
    public precauciones?: string,
    public reacciones_adversas?: string,
    public url?: string,
    public foto?: string,
    public documento?: string,
    public habilitado?: boolean,
    public Laboratorio?: Laboratorio,
    public Pais?: Pais,
    public SustanciaActiva?: SustanciaActiva,
    public UsoTerapeutico?: UsoTerapeutico,
    public ViaAdministracion?: ViaAdministracion,
    // public posologias?: PosologiaPorEspecie[], 
    // public presentaciones?: PresentacionesMedicamento[] 
  ) {}
}

