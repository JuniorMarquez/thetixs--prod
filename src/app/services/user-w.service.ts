import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserWService {
info:any={};
isLogged:boolean=false;
	userW:any[]=[];
	user:any={};
	name:string;
	idCard:string;
	type:string;
	userd:string;
	affiliate:boolean;
	partner:boolean;
	admin:boolean;
	bandera:string;
	selectorB:boolean;
	selectorA:boolean;
	errorFormAffiliate:boolean;
	errorFormPartner:boolean;
	errorFormAddtixs:boolean;
	usersPending:boolean;
	cardsResult:any[]=[];
	card:any={};
  constructor() { }
}


