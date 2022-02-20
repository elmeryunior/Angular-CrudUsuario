import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../Modelo/Persona';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public username: string;
  public password: string;

  constructor(private http:HttpClient) { }

  //De esta forma se obtienen los datos del apirest
  Urllistar = 'http://localhost:8080/personas/listar';

  Urladd = 'http://localhost:8080/personas/guardar';

  Urlbuscar = 'http://localhost:8080/personas/listarId';

  Urlactualizar = 'http://localhost:8080/personas/actualizar';

  Urleliminar = 'http://localhost:8080/personas/eliminar';

  getPersonas(){
    return this.http.get<Persona[]>(this.Urllistar);
  }

  addPersonas(persona:Persona){
    return this.http.post<Persona>(this.Urladd,persona);
  }

  getPersonaId(id:number){
    return this.http.get<Persona>(this.Urlbuscar+"/"+id);
  }

  putPersonaAct(persona:Persona){
    return this.http.put<Persona>(this.Urlactualizar,persona);
  }

  deletePersonaId(id:number){
    return this.http.delete<Persona>(this.Urleliminar+"/"+id);
  }

}
