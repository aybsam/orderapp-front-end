import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Commande, Produit } from '../list-commandes/list-commandes.component';
import { NgForm } from '@angular/forms';
import { ProductDataService } from '../service/data/product-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  id:number
  numeroCommande: number
  dateCommande: Date
  description: string
  commande: Commande
  produits: Produit[]
  localFields: Object
  public localWaterMark: string
  public countries: { [key: string]: Object; }[]

  selectedData = [];
  public value: string[]


  constructor(
    private todoService: TodoDataService,
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
    this.numeroCommande = this.route.snapshot.params['numeroCommande'];
    this.dateCommande = this.route.snapshot.params['dateCommande'];
    this.description = this.route.snapshot.params['description'];
    
    this.commande = new Commande(this.id,this.numeroCommande,this.dateCommande,this.description,[]);

    // define the JSON of data
   this.countries= [
    { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' }, 
    ];
    // maps the local data column to fields property
    this.localFields= { text: 'nomProduit', value: 'numeroProduit'};
    // set the placeholder to MultiSelect Dropdown input element
    this.localWaterMark= 'Select products';
    
    if(this.id!=-1) {
      this.todoService.retrieveTodo('in28minutes', this.id)
          .subscribe (
            data => this.commande = data
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
  saveTodo() {
     let prods: Produit[];
    if(this.id == -1) { //=== ==
      /* for (let pr of this.produits) {
        console.log("STR : "+pr.numeroProduit);

        for(let str of form.value){
          console.log("STR : "+str.numeroProduit);
          if(str==pr.numeroProduit){
            console.log("STR : "+str);
            
            prods.push(pr);
          }
        }
    }  */
      console.log( "TEST " +this.commande.produits);
      this.todoService.createTodo('in28minutes',this.commande)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['commandes'])
            }
          )
    } else {
      this.todoService.updateTodo('in28minutes', this.id, this.commande)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['commandes'])
            }
          )
    }
  }

}
