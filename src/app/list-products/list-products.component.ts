
import { ProductDataService } from '../service/data/product-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Commande {
  constructor(
    public id: number,
    public numeroCommande: number,
    public dateCommande: Date,
    public description: string,
    public produits: Produit[]
  ){

  }
}

export class Produit {
  constructor(
    public id: number,
    public numeroProduit: number,
    public nomProduit: string,
    public quantite: number,
    public prix: number
  ){
  }
}

export class Facture {
  constructor(
    public numeroFacture: number,
    public dateFacture: Date,
    public montant: number
  ) {}
}

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Produit[]

  message: string

  // = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Become an Expert at Angular', false, new Date()),
  //   new Todo(3, 'Visit India', false, new Date())
  //   // {id : 1, description : },
  //   // {id : 2, description : ''},
  //   // {id : 3, description : 'Visit India'}
  // ]

  // todo = {
  //     id : 1,
  //     description: 'Learn to Dance'
  // }

  constructor(
    private productService:ProductDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.refreshProducts();
  }

  refreshProducts(){
    this.productService.retrieveAllProduits('in28minutes').subscribe(
      response => {
        console.log(response);
        this.products = response;
      }
    )
  }

  deleteProduct(id) {
    console.log(`delete product ${id}` )
    this.productService.deleteProduit('in28minutes', id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of product ${id} Successful!`;
        this.refreshProducts();
      }
    )
  }

  updateProduit(id) {
    console.log(`update ${id}`)
    this.router.navigate(['products',id])
  }

  addProduct() {
    this.router.navigate(['products',-1])
  }
}

