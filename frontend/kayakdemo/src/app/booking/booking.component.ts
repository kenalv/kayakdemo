import { Component, OnChanges, OnInit,EventEmitter, Output,SimpleChanges,Inject } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
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
  private oiflightsData: {
		outData: any, 
		inData: any
	}[];

  origin:string;
  destiny:string;

  orig_country:string;
  dest_country:string;
  reserve_type:string;
  tickets: number;
  flight_cost:number;
  one_flight_id:number;
  trip_total_cost:number;

  constructor(private router: Router,private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.origin = params['idOut'];
      this.reserve_type =  params['ida'];
    
      this.tickets = params['tickets'];
      if(this.reserve_type == 'ida'){
         this.getFlightToReserve(this.origin);
         this.trip_total_cost = this.flight_cost * this.tickets;
      }else{
        console.log('obteniendo vuelos ida y vuelta');
        this.destiny = params['idIn'];

        this.getOutInFlightsToReserve(this.origin,this.destiny);
      }
   });
  }
  getFlightToReserve(origin: string) {
		this.serverService.getFlightReserveData(origin).subscribe((response) => {
		
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
        this.flight_cost = charactersData[0].cost;
        this.dest_country = charactersData[0].dest;
        this.orig_country = charactersData[0].orig;
        
        this.one_flight_id = charactersData[0].id;
        this.flightsData = charactersData;
        
        console.log(this.one_flight_id);
      });  
  }

	getOutInFlightsToReserve(origin:string,destiny:string){
		this.serverService.getFlightsReserveData(origin,destiny).subscribe((response) => {
			
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
							}}
				});
			
				this.oiflightsData = outflightData;
				console.log(this.oiflightsData);
			});
		
	}



  reserveData(id:string,tiquets:string){
    this.serverService.reserveFlight(id,tiquets).subscribe((response) => {

      console.log(response);
    });

    var myurl;
		myurl = ``;
	
		
		this.router.navigateByUrl(myurl).then(e => {
		if (e) {
			console.log("Navigation is successful!");
		} else {
			console.log("Navigation has failed!");
		}
		});
  }




}
