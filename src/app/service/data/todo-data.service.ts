import { TODO_JPA_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../../list-commandes/list-commandes.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos(username) {
    return this.http.get<Commande[]>(`${TODO_JPA_API_URL}/commandes`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteTodo(username, id){
    return this.http.delete(`${TODO_JPA_API_URL}/commande/${id}`);
  }

  retrieveTodo(username, id){
    return this.http.get<Commande>(`${TODO_JPA_API_URL}/commandes/${id}`);
  }

  updateTodo(username, id, commande){
    return this.http.put(
          `${TODO_JPA_API_URL}/commandes/${id}`
                , commande);
  }

  createTodo(username, commande){
    return this.http.post(
              `${TODO_JPA_API_URL}/commandes`
                , commande);
  }

}
