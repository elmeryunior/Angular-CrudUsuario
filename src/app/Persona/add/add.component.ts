import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Modelo/Persona';
import { ServiceService } from '../../Service/service.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service:ServiceService, private router:Router) { }

  modelPersona = new Persona();

  ngOnInit(): void {
  }

  Guardar(){
    this.service.addPersonas(this.modelPersona)
    .subscribe(data =>{
      swal.fire(
        'Usuario Registrado!',
        'El registro del usuario a sido adicionado.',
        'success'
      )
      this.router.navigate(["listar"]);
    })
  }

}
