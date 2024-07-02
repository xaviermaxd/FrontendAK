// horario.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Horario } from '../../models/horario.model';
import { HorarioService } from '../../services/horario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent  {
  // horarios: Horario[] = [];
  // horarioForm: FormGroup;

  // constructor(private horarioService: HorarioService, private fb: FormBuilder) {
  //   this.horarioForm = this.fb.group({
  //     Dia: ['', Validators.required],
  //     HoraInicio: ['', Validators.required],
  //     HoraFin: ['', Validators.required],
  //     Capacidad: ['', Validators.required]
  //   });
  // }

  // ngOnInit(): void {
  //   this.getHorarios();
  // }
  // getHorarios(): void {
  //   this.horarioService.getHorarios().subscribe(horarios => {
  //     this.horarios = horarios;
  //   });
  // }

  // addHorario(): void {
  //   if (this.horarioForm.valid) {
  //     this.horarioService.addHorario(this.horarioForm.value).subscribe(() => {
  //       Swal.fire('¡Hecho!', 'Horario agregado con éxito.', 'success');
  //       this.getHorarios();
  //     }, error => {
  //       Swal.fire('¡Error!', 'No se pudo agregar el horario.', 'error');
  //     });
  //   }
  // }

  // updateHorario(id: number): void {
  //   if (this.horarioForm.valid) {
  //     this.horarioService.updateHorario(id, this.horarioForm.value).subscribe(() => {
  //       Swal.fire('¡Hecho!', 'Horario actualizado con éxito.', 'success');
  //       this.getHorarios();
  //     }, error => {
  //       Swal.fire('¡Error!', 'No se pudo actualizar el horario.', 'error');
  //     });
  //   }
  // }

  // deleteHorario(id: number): void {
  //   Swal.fire({
  //     title: '¿Estás seguro?',
  //     text: "No podrás revertir esto.",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí, bórralo'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.horarioService.deleteHorario(id).subscribe(() => {
  //         Swal.fire('¡Borrado!', 'El horario ha sido borrado.', 'success');
  //         this.getHorarios();
  //       }, error => {
  //         Swal.fire('¡Error!', 'No se pudo borrar el horario.', 'error');
  //       });
  //     }
  //   });
  // }
}
