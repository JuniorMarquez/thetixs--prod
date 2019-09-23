import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface';  
import { CardInterface } from '../../models/card-interface';  
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-tixs',
  templateUrl: './my-tixs.component.html',
  styleUrls: ['./my-tixs.component.css']
})
export class MyTixsComponent implements OnInit {

  constructor(
    private router: Router, 
    private location: Location, 
    private authService: AuthService,
    public dataApi: DataApiService, 
    public _uw:UserWService
    ) { }

  
  
  public user : UserInterface ={
    name:"",
    email:"",
    password:""
  };
  public cards:CardInterface;
  public cardsResult:any[]=[];
  public isLogged =false;

  cardArray: any[]=[];

  ngOnInit() {
    this._uw.usersPending=false;
	  this.user = this.authService.getCurrentUser();
 	 	// console.log(this.user);
    this._uw.name=this.user.name;
 	 	this.onCheckUser();     //--header update
    let val=(this.user.id).toString();
    this.dataApi.getCards(val).subscribe((res:any) => {
      if (res[0] === undefined){
        console.log("no");
        this.router.navigate(['/new-member']);
        }else{
        console.log("si");
        this._uw.card= (res[0]);
        this._uw.bandera=(res[0].bander);
        //console.log(res[0].type);
        if (res[0].type=="affiliateType"){
          this._uw.affiliate=true;
 //         console.log("el uuario es un affiliate");
          this.router.navigate(['/booking']);
        }
        if (res[0].type=="partnerType"){
          this._uw.partner=true;

   //       console.log("el uuario es un partner");
        }
        if (res[0].type=="adminType"){
          this._uw.admin=true;
          this.getUsersPending();
     //     console.log("el uuario es un adminitrador");
        }        
        

        this._uw.type=res[0].type;
        //  console.log("bandera dentro", this._uw.bandera);              
        }
      });
    //console.log("bandera fuera: ", this._uw.bandera);
  }

  getUsersPending(){
  this.dataApi.getPendingPartners().subscribe((res:any) => {
      if (res[0] === undefined){
        console.log("no");
       this._uw.usersPending=false;
       }else{
        this._uw.usersPending=true;
        this.cards=res;
     //   console.log("si");
        //  console.log("bandera dentro", this._uw.bandera);              
        }
     });
   }
   getPending(){
        this.dataApi
        .getPendingPartners()
        .subscribe((cards: CardInterface) => (this.cards=cards));
    }

// getUsersPending(){
  //  this.dataApi
    //    .getUsersPending()
      //  .subscribe((cards CardInterface) => {this.card=card;this._uw.usersPending=true;});
   // 
 // }

  getCards(card_id: string){
    this.dataApi.getCards(card_id);
    }

  onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
      this.isLogged = false;
      this._uw.isLogged=false;
    } else {
      this.isLogged = true;
      this._uw.isLogged=true;
    }
  }
}
