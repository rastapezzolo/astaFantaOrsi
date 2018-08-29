import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<{title: string, sum: number, icon: string}>;
  roles: string[];

  constructor(public navCtrl: NavController) {
  	this.roles = ['portieri', 'difensori','centrocampisti','attaccanti']
  	this.items = []
  	for(let role of this.roles){
		this.items.push({ title: role, sum: 0, icon: 'football'})
  	}
  }

}
