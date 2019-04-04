import { Component, DoCheck, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { ServerService } from '../server.service';
import { Search } from '../search';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchModel = new Search('','','','','','','',false);

  @Output() searchOutputData:EventEmitter<Search> = new EventEmitter<Search>();

	private classesData: {
		id: number,
		name: string,
    cost: number
  }[];


  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
  
	this.getClasses()

  }
  getClasses() {
		this.serverService.getTravelClassesData().subscribe((response) => {
				let classData = response.results.map((res) => {
						   return {id: res['id'],
							name: res['name'],
							cost: res['cost']
						}
				});
				this.classesData = classData;
			});
  }
  
  onSearch(){
    //console.log(this.searchModel);
    this.searchOutputData.emit(this.searchModel);
  }


  /*  */
  newSearch(){
    var myurl;
    if(this.searchModel.out_in == 'ida'){
      myurl = `/flights/${this.searchModel.origin}/${this.searchModel.destiny}/${this.searchModel.out_date}/${this.searchModel.tickets}/${this.searchModel.out_in}`;
    }else{
      myurl = `/flights/${this.searchModel.origin}/${this.searchModel.destiny}/${this.searchModel.out_date}/${this.searchModel.in_date}/${this.searchModel.tickets}/${this.searchModel.out_in}`;
    }
    
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }



}
