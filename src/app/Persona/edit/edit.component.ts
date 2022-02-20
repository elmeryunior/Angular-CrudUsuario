import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Modelo/Persona';
import { ServiceService } from 'src/app/Service/service.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private service:ServiceService, private router:Router) { }

  persona = new Persona();

  ngOnInit(): void {
    this.Editar();
  }

  Editar(){
    let id = localStorage.getItem("id");
    if(id != null){
      this.service.getPersonaId(+id)
      .subscribe(data=>{
        this.persona = data;
      })
    }else{
      alert("El id es null");
    }

  }

  Actualizar(){
    this.service.putPersonaAct(this.persona)
    .subscribe(data=>{
      this.persona = data;
      swal.fire(
        'Usuario actualizado!',
        'El registro del usuario a sido actualizado.',
        'success'
      )
      this.router.navigate(["listar"]);
    })
  }

}
