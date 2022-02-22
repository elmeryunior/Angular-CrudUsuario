import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Modelo/Persona';
import { ServiceService } from '../../Service/service.service';
import swal from'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};

  dtTrigger: any = new Subject();

  personas: Persona[];

  constructor(private service: ServiceService, private router: Router) {}

  //este método se ejetuta al llamar al formulario
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      //esto es la internalizacion
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
      }
    };
    this.service.getPersonas().subscribe((data) => {
      this.personas = data;
      this.dtTrigger.next();
    });
  }

  //de esta manera se manda el id persona a otro componente
  Editar(persona: Persona): void {
    localStorage.setItem('id', persona.id.toString());
    this.router.navigate(['edit']);
  }

  //eliminar registro y actualizar lista
  Eliminar(persona: Persona): void {
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar el usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deletePersonaId(persona.id)
        .subscribe(data=>{
        this.personas = this.personas.filter(p=>p!==persona);
        swal.fire(
          'Eliminado!',
          'El registro del usuario a sido eliminado.',
          'success'
        )
      })
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelado',
          'Su registro de usuario está seguro :)',
          'error'
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
