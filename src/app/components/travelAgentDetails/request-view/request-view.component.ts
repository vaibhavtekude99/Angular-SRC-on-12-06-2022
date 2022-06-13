import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { TravelRequestDetailsService } from 'src/app/services/travelRequestDetailsService/travel-request-details.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit {

  // employeeDetails : EmployeeDetails =  new EmployeeDetails();
  // travelRequest:TravelRequest=new TravelRequest();

  travelRequestID:number=0;
  constructor(private travelRequestService:TravelRequestDetailsService,private router:Router) { }

  ngOnInit(): void {
  // this.employeeDetails = JSON.parse(sessionStorage.getItem('employee') || '{}');

    this.getAll();
  }
 allTravelRequests: TravelRequest []=[];

 getAll()
 {
  this.travelRequestService.getAllAprovedTravelRequest().subscribe( data=>{
    this.allTravelRequests=data;
    console.log(this.allTravelRequests);
  });
 }
 onClickCheckStatus(travelRequestId:number)
 {
  
  
     console.log(travelRequestId);
     this.router.navigate(['agenthome/slabdetails',travelRequestId]);
  
 }
 

}
