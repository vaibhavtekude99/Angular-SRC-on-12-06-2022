import { Component, OnInit } from '@angular/core';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { TravelRequestDetailsService } from 'src/app/services/travelRequestDetailsService/travel-request-details.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  action: string = ''
  // employeeDetails : EmployeeDetails =  new EmployeeDetails();
  // travelRequest:TravelRequest=new TravelRequest();
  constructor(private travelRequestService: TravelRequestDetailsService) { }
  travelRequests: TravelRequest[] = [];
  travelRequest: TravelRequest = new TravelRequest();

  ngOnInit(): void {
    // this.employeeDetails = JSON.parse(sessionStorage.getItem('employee') || '{}');

    this.getAll();
  }
  allTravelRequests: TravelRequest[] = [];

  getAll() {
    this.travelRequestService.getAllRejectedTravelRequests().subscribe(data => {
      this.allTravelRequests = data;
      console.log(this.allTravelRequests);
    });
  }
  onClickApprove(travelRequestId: number) {
    this.action = 'APPROVED';
    console.log(travelRequestId);
    this.travelRequestService.getTravelRequestByTravelRequestId(travelRequestId).subscribe(data => {
      console.log(data);
      this.travelRequest = data;

      //update as Manager status is approve object
      this.travelRequest.directorStatus = this.action;
      console.log(this.travelRequest);
      this.travelRequestService.updateTravelRequestOfDirector(this.travelRequest).subscribe(data => {
        console.log(data);
        this.getAll();
      });
    });

  }

  onClickReject(travelRequestId: number) {
    this.action = 'REJECTED'
    console.log(travelRequestId);
    this.travelRequestService.getTravelRequestByTravelRequestId(travelRequestId).subscribe(data =>
       {
      this.travelRequest = data;

      //update Object as Manager Status Rejected
      this.travelRequest.directorStatus = this.action;
      console.log(this.travelRequest);
      this.travelRequestService.updateTravelRequestOfDirector(this.travelRequest).subscribe(data => 
        {
        console.log(data);
        this.getAll();
        });

      console.log(data);
    });
  }

}
