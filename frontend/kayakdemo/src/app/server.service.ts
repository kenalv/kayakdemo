import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringMap } from '@angular/core/src/render3/jit/compiler_facade_interface';
@Injectable({
	providedIn: 'root'
})



export class ServerService {
	private flightsData: {results: []};
	private classData: {results:[]};

	constructor(private httpClient: HttpClient) {}

	private extractFlightsData(res: any) {
		return this.flightsData = { results: res };
	}
	private extractFlightReserveData(res: any) {
		return this.flightsData = { results: res };
	}
	private extractClassesData(res: any) {
		return this.classData = { results: res};
	}
	private extractOIFlightsData(res: any) {
		return this.flightsData = {results: res};
	}

// PUTS
	public reserveFlight(id:string,tiquets:string){
		let data = {'id':id,'tiquets':tiquets}
		return this.httpClient.put(
			'http://localhost:8000/flys/update/',data
		);
	}
// GETS
	public getFlightReserveData(origin: string): Observable<any> {
		return this.httpClient.get(
			'http://localhost:8000/flys/' + origin + '/'
		).pipe(map(this.extractFlightReserveData));
	}
	public getFlightsReserveData(origin: string,destiny:string): Observable<any> {
		return this.httpClient.get(
			'http://localhost:8000/flys/' + origin + '/'+ destiny + '/'
		).pipe(map(this.extractOIFlightsData));
	}
	/* OBTIENE SOLO VUELOS DE IDA */
	public getOutFlightsData(origin: string, destiny: string, out_date: string): Observable<any> {
		return this.httpClient.get(
			'http://localhost:8000/flys/' + origin + '/' + destiny + '/' + out_date + '/'
		).pipe(map(this.extractFlightsData));
	}
	/* OBTIENE SOLO VUELOS DE IDA */
	public getOutInFlightsData(origin: string, destiny: string, out_date: string, in_date: string): Observable<any> {
		console.log(origin);
		return this.httpClient.get(
			'http://localhost:8000/flys/' + origin + '/' + destiny + '/' + out_date + '/'+ in_date + '/'
		).pipe(map(this.extractOIFlightsData));
	}


	public getAllFlightsData(): Observable<any> {
		return this.httpClient.get('http://127.0.0.1:8000/flys/').pipe(map(this.extractFlightsData));
	}
	public getTravelClassesData(): Observable<any> {
		return this.httpClient.get('http://127.0.0.1:8000/flys/classes/').pipe(map(this.extractClassesData));
	}

}
 /*
 
    Variables ambiente   .env  Angular  
   
 
 */