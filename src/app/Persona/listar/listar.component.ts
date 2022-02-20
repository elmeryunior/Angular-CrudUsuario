import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Modelo/Persona';
import { ServiceService } from '../../Service/service.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  personas: Persona[];
  constructor(private service: ServiceService, private router: Router) {}

  //este método se ejetuta al llamar al formulario
  ngOnInit(): void {
    this.service.getPersonas().subscribe((data) => {
      this.personas = data;
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
}
