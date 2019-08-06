import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Commande, Produit } from '../list-commandes/list-commandes.component';
import { NgForm } from '@angular/forms';
import { ProductDataService } from '../service/data/product-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id:number
  numeroProduit: number
  nomProduit: string
  prix: number
  quantite: number
  product: Produit
  produits: Produit[]
  localFields: Object
  public localWaterMark: string
  public countries: { [key: string]: Object; }[]

  selectedData = [];
  public value: string[]


  constructor(
    private produitService: ProductDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.numeroProduit = this.route.snapshot.params['numeroProduit'];
    this.nomProduit = this.route.snapshot.params['nomProduit'];
    this.prix = this.route.snapshot.params['prix'];
    this.quantite = this.route.snapshot.params['quantite'];
    
    //this.commande = new Commande(this.id,this.numeroCommande,this.dateCommande,this.description,[]);
    this.product = new Produit(this.id,this.numeroProduit,this.nomProduit,this.prix,this.quantite);
  
    if(this.id!=-1) {
      this.produitService.retrieveProduit('in28minutes', this.id)
          .subscribe (
            data => this.product = data
          )
    }

    this.produitService.retrieveAllProduits('in28minutes').subscribe(
      response => {
        console.log("ALL PRODUCTS : "+response);
        this.produits = response;
      }
    )
  }

  onSubmit(){
    console.log(this.selectedData)
  }
  saveProduct() {
    if(this.id == -1) {
      this.produitService.createProduit('in28minutes',this.product)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['products'])
            }
          )
    } else {
      this.produitService.updateProduit('in28minutes', this.id, this.product)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['products'])
            }
          )
    }
  }

}
