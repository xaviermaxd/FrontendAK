// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Importar ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { NuevoPropietarioComponent } from './components/nuevo-propietario/nuevo-propietario.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarPropietarioComponent } from './components/editar-propietario/editar-propietario.component';
import { PropietarioDetallesComponent } from './components/propietario-detalles/propietario-detalles.component';
import { NuevoMascotaComponent } from './components/nuevo-mascota/nuevo-mascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { EditarMascotaComponent } from './components/editar-mascota/editar-mascota.component';
import { MascotaDetallesComponent } from './components/mascota-detalles/mascota-detalles.component';
import { MedicamentoComponent } from './components/medicamento/medicamento.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { HistorialClinicoDetallesComponent } from './components/historial-clinico-detalles/historial-clinico-detalles.component';
import { VeterinarioComponent } from './components/veterinario/veterinario.component';
import { NuevoVeterinarioComponent } from './components/nuevo-veterinario/nuevo-veterinario.component';
import { EditarVeterinarioComponent } from './components/editar-veterinario/editar-veterinario.component';
import { VeterinarioDetallesComponent } from './components/veterinario-detalles/veterinario-detalles.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { HorarioComponent } from './components/horario/horario.component';
import { TurnoComponent } from './components/turno/turno.component';
import { FilterByDayPipe } from './pipes/filterByDay.pipe';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { NuevoMedicamentoComponent } from './components/nuevo-medicamento/nuevo-medicamento.component';
import { MedicamentoDetallesComponent } from './components/medicamento-detalles/medicamento-detalles.component';
import { EditarMedicamentoComponent } from './components/editar-medicamento/editar-medicamento.component';
import { NuevoVacunacionComponent } from './components/nuevo-vacunacion/nuevo-vacunacion.component';
import { NuevoDesparasitacionComponent } from './components/nuevo-desparasitacion/nuevo-desparasitacion.component';
import { ConsultaMedicaComponent } from './components/consulta-medica/consulta-medica.component';
import { NuevoConsultaMedicaComponent } from './components/nuevo-consulta-medica/nuevo-consulta-medica.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConsultaMedicaDetallesComponent } from './components/consulta-medica-detalles/consulta-medica-detalles.component';
import { VacunacionDetallesComponent } from './components/vacunacion-detalles/vacunacion-detalles.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    PerfilComponent,
    PropietarioComponent,
    PaginacionComponent,
    NuevoPropietarioComponent,
    EditarPropietarioComponent,
    PropietarioDetallesComponent,
    NuevoMascotaComponent,
    MascotaComponent,
    EditarMascotaComponent,
    MascotaDetallesComponent,
    MedicamentoComponent,
    UpdatePasswordComponent,
    HistorialClinicoDetallesComponent,
    VeterinarioComponent,
    NuevoVeterinarioComponent,
    EditarVeterinarioComponent,
    VeterinarioDetallesComponent,
    ReservaComponent,
    HorarioComponent,
    TurnoComponent,
    FilterByDayPipe,
    EstadisticasComponent,
    NuevoMedicamentoComponent,
    MedicamentoDetallesComponent,
    EditarMedicamentoComponent,
    NuevoVacunacionComponent,
    NuevoDesparasitacionComponent,
    ConsultaMedicaComponent,
    NuevoConsultaMedicaComponent,
    ConsultaMedicaDetallesComponent,
    VacunacionDetallesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
