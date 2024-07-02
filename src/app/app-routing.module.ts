// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { PropietarioDetallesComponent } from './components/propietario-detalles/propietario-detalles.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { DataResolverService } from './services/dataResolver.service';
import { MascotaDetallesComponent } from './components/mascota-detalles/mascota-detalles.component';
import { MedicamentoComponent } from './components/medicamento/medicamento.component';
import { MedicamentoDetallesComponent } from './components/medicamento-detalles/medicamento-detalles.component';
import { HistorialClinicoDetallesComponent } from './components/historial-clinico-detalles/historial-clinico-detalles.component';
import { VeterinarioComponent } from './components/veterinario/veterinario.component';
import { VeterinarioDetallesComponent } from './components/veterinario-detalles/veterinario-detalles.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { HorarioComponent } from './components/horario/horario.component';
import { TurnoComponent } from './components/turno/turno.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { NuevoConsultaMedicaComponent } from './components/nuevo-consulta-medica/nuevo-consulta-medica.component';
import { ConsultaMedicaDetallesComponent } from './components/consulta-medica-detalles/consulta-medica-detalles.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]}, // Protege esta ruta con AuthGuard
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'propietarios', component: PropietarioComponent, canActivate: [AuthGuard] },
  { path: 'propietario-detalles/:id', component: PropietarioDetallesComponent, resolve: { data: DataResolverService }, canActivate: [AuthGuard] },
  { path: 'mascotas', component: MascotaComponent, canActivate: [AuthGuard] },
  { path: 'mascota-detalles/:id', component: MascotaDetallesComponent, resolve: { data: DataResolverService }, canActivate: [AuthGuard] },
  { path: 'medicamentos', component: MedicamentoComponent, canActivate: [AuthGuard] },
  { path: 'medicamento-detalles/:id', component: MedicamentoDetallesComponent, resolve: { data: DataResolverService }, canActivate: [AuthGuard] },
  { path: 'historial-clinico-detalles/:id', component: HistorialClinicoDetallesComponent, canActivate: [AuthGuard] },
  { path: 'veterinarios', component: VeterinarioComponent, canActivate: [AuthGuard] },
  { path: 'veterinario-detalles/:id', component: VeterinarioDetallesComponent, resolve: { data: DataResolverService }, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservaComponent, canActivate: [AuthGuard] },
  { path: 'horarios', component: TurnoComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-consulta-medica/:id', component: NuevoConsultaMedicaComponent, canActivate: [AuthGuard] },
  { path: 'consulta-medica-detalles/:id', component: ConsultaMedicaDetallesComponent , resolve: { data: DataResolverService }, canActivate: [AuthGuard] },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
  // ... puedes añadir aquí otras rutas para otros componentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
