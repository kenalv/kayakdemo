import { Component, OnChanges, OnInit,EventEmitter, Output,SimpleChanges,Inject } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ServerService } from '../server.service';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
	selector: 'app-flights',
	templateUrl: './flights.component.html',
	styleUrls: [ './flights.component.css' ]
})
export class FlightsComponent implements OnInit {
	@Output() reserveFlight:EventEmitter<boolean> = new EventEmitter<boolean>();
	
	search_status:string;
  origin:string;
	destiny: string;
	out_date: string;
	in_date: string;
	class_type: string;
	tickets: number;

	private oiflightsData: {
		outData: any, 
		inData: any
	}[];

	private flightsData: {
		id: number,
		fly_type: string,
		orig: string,
		dest: string,
		airline: string,
		airport: string,
		out_date: string,
		tiquets: number,
		cost: number,
		class_type: string,
		duration: number
	}[];

	constructor(private router: Router,private route: ActivatedRoute, private serverService: ServerService) {}


	ngOnInit() {

		this.route.params.subscribe((params: Params) => {
			 this.origin = params['origin'];
			 this.destiny = params['destiny'];
			 this.out_date = params['out_date'];
			 this.search_status = params['search_status']
			 this.tickets = params['tickets'];

			 if(this.search_status == 'ida'){
					this.getFlights(this.origin,this.destiny,this.out_date);
			 }else{
				 console.log('obteniendo vuelos ida y vuelta');
				 this.in_date = params['in_date'];
				 this.getOutInFlights(this.origin,this.destiny,this.out_date,this.in_date);
			}
		});
	}

	onReserve(id:number){
		console.log(`dando click a ${id}`);
		this.reserveFlight.emit(true);
		var myurl;
		myurl = `/reserve/${id}/${this.tickets}/${this.search_status}`;
	
		
		this.router.navigateByUrl(myurl).then(e => {
		if (e) {
			console.log("Navigation is successful!");
		} else {
			console.log("Navigation has failed!");
		}
		});
	
	  }
	
	/*Actually, get all Flights of the specific page*/ 
	getFlights(origin: string,destiny:string,out_date:string) {
		this.serverService.getOutFlightsData(origin,destiny,out_date).subscribe((response) => {
			    console.log(response);
				let charactersData = response.results.map((char) => {
						   return {id: char['id'],
							fly_type: char['fly_type'],
							orig: char['orig'],
							dest:  char['dest'],
							airline:  char['airline'],
							airport:  char['airport'],
							out_date:  char['out_date'],
							tiquets:  char['tiquets'],
							cost:  char['cost'],
							class_type:  char['class_type'],
							duration:  char['duration']}
				});
				this.flightsData = charactersData;
			});
	}
	getOutInFlights(origin:string,destiny:string,out_date:string,in_date:string){
		this.serverService.getOutInFlightsData(origin,destiny,out_date,in_date).subscribe((response) => {
				console.log(response);
				let outflightData = response.results.map((char) => {
				
						   return {outData: {id: char.out.id,
							fly_type: char.out.fly_type,
							orig: char.out.orig,
							dest:  char.out.dest,
							airline:  char.out.airline,
							airport:  char.out.airport,
							out_date:  char.out.out_date,
							tiquets:  char.out.tiquets,
							cost:  char.out.cost,
							class_type:  char.out.class_type,
							duration:  char.out.duration},
							inData:{id: char.in.id,
								fly_type: char.in.fly_type,
								orig: char.in.orig,
								dest:  char.in.dest,
								airline:  char.in.airline,
								airport:  char.in.airport,
								out_date:  char.in.out_date,
								tiquets:  char.in.tiquets,
								cost:  char.in.cost,
								class_type:  char.in.class_type,
								duration:  char.in.duration
							}};
				});
				this.oiflightsData = outflightData;
				console.log(this.oiflightsData);
			});
	}
}
