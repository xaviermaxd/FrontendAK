import { EstadoGeneral } from './estado-general.model';
import { StatusMental } from './status-mental.model';
import { Temperamento } from './temperamento.model';
import { Comportamiento } from './comportamiento.model';
import { CondicionCorporal } from './condicion-corporal.model';
import { PatronFC } from './patron-fc.model';
import { PatronFR } from './patron-fr.model';
import { Pulso } from './pulso.model';
import { Mucosas } from './mucosas.model';
import { TiempoLlenadoCapilar } from './tiempo-llenado-capilar.model';
import { EstadoHidratacion } from './estado-hidratacion.model';
import { Veterinario } from './veterinario.model';
import { Mascota } from './mascota.model';

export class ConsultaMedica {
  constructor(
    public id: number,
    public veterinario_id: number,
    public mascota_id: number,
    public fecha_consulta: Date,
    public curso: number,
    public tiempo: string,
    public descripcion_propietario: string,
    public estado_general_id: number,
    public status_mental_id: number,
    public temperamento_id: number,
    public comportamiento_id: number,
    public condicion_corporal_id: number,
    public patron_fc_id: number,
    public frecuencia_cardiaca: number,
    public patron_fr_id: number,
    public frecuencia_respiratoria: number,
    public glucemia: number,
    public pas: number,
    public pad: number,
    public pam: number,
    public pulso_id: number,
    public peso: number,
    public temperatura: number,
    public mucosas_id: number,
    public tiempo_llenado_capilar_id: number,
    public estado_hidratacion_id: number,
    public necesita_examenes: boolean,
    public realizo_tratamientos: boolean,
    public descripcion_tratamiento: string,
    public diagnostico_presuntivo: string,
    public observaciones_adicionales: string,
    public habilitado: boolean,
    public EstadoGeneral?: EstadoGeneral,
    public StatusMental?: StatusMental,
    public Temperamento?: Temperamento,
    public Comportamiento?: Comportamiento,
    public CondicionCorporal?: CondicionCorporal,
    public PatronFC?: PatronFC,
    public PatronFR?: PatronFR,
    public Pulso?: Pulso,
    public Mucosas?: Mucosas,
    public TiempoLlenadoCapilar?: TiempoLlenadoCapilar,
    public EstadoHidratacion?: EstadoHidratacion,
    public Veterinario?: Veterinario,
    public Mascota?: Mascota,
  ) {}
}
