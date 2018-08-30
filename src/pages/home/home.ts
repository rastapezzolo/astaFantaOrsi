import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<{title: string, sum: number, icon: string}>;
  roles: string[];
  data: Array<{nome:string, prezzo:number}>
  nome: string[]
  prezzo: number[]
  sum: {portieri: number,difensori: number,centrocampisti: number,attaccanti: number}

  constructor(public navCtrl: NavController, private storage: Storage) {
  	
  	this.roles = ['portieri', 'difensori','centrocampisti','attaccanti']
  	this.items = []
  	this.nome = []
  	this.prezzo = []
  	this.data = []
  	this.sum = {portieri: 0, difensori: 0, centrocampisti: 0, attaccanti: 0}

  	for(let role of this.roles){
		this.items.push({ title: role, sum: 0, icon: 'football' })
  	}
  
  }

  public addPlayer(ruolo: string, i){
  	
  	var prezzo = (this.prezzo[i])
  	var nome = this.nome[i]
  	if('undefined' !== typeof ruolo && 'undefined' !== typeof nome && 'undefined' !== typeof prezzo){
	  	this.data.push({ nome, prezzo })
	  	this.storage.set(`players_${ruolo}`, this.data);
  	}
  	this.prezzo[i] = 0
  	this.nome[i] = ''
  	this.sum[ruolo] += parseInt(prezzo)
  
  }

  public getPlayer(ruolo: string){
  	
  	var p = this.storage.get(`players_${ruolo}`)

  	return p
  
  }

  public clearPlayers(ruolo: string){
  
  	this.storage.remove(`players_${ruolo}`);
  	this.sum[ruolo] = 0

  }

  public clearAllPlayers(){
  
  	this.storage.clear();
  
  }

  public getSum(ruolo: string){
  	
  	var players = this.getPlayer(ruolo)
  	var sum = 0
  	players.then((val)=>{
	  	for(let player of val){
	  		sum += parseInt(player.prezzo)
	  	}
  		this.sum[ruolo] = sum
  	})
  
  }
}
