import { Component, OnInit } from '@angular/core';
import { Search } from './search';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{


	ngOnInit() {
		
	}

	reserveFlag = false;
	
	title = 'kayakdemo';
	loadedFeature = 'flights';
	
	searchData: Search = new Search('','','','','','','',false);

	onNavigate(feature: string) {
		this.loadedFeature = feature;
	}
	onSearchEmit(data: Search){
		console.log(data.status);
		this.searchData = data;
		this.reserveFlag = false;
	}
	onReserveEmit(reserve: boolean){
		console.log(reserve);
		this.reserveFlag = true
	}

}
