import { TODO_JPA_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande, Produit } from '../../list-commandes/list-commandes.component';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllProduits(username) {
    return this.http.get<Produit[]>(`${TODO_JPA_API_URL}/produits`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteProduit(username, id){
    return this.http.delete(`${TODO_JPA_API_URL}/produit/${id}`);
  }

  retrieveProduit(username, id){
    return this.http.get<Produit>(`${TODO_JPA_API_URL}/produits/${id}`);
  }

  updateProduit(username, id, produit){
    return this.http.put(
          `${TODO_JPA_API_URL}/produits/${id}`
                , produit);
  }

  createProduit(username, produit){
    return this.http.post(
              `${TODO_JPA_API_URL}/produit`
                , produit);
  }

}
