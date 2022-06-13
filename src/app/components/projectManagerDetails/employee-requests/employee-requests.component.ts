import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { TravelRequestDetailsService } from 'src/app/services/travelRequestDetailsService/travel-request-details.service';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.css']
})
export class EmployeeRequestsComponent implements OnInit {

  // employeeDetails : EmployeeDetails =  new EmployeeDetails();
  travelRequest: TravelRequest = new TravelRequest();
  action: string = '';
  constructor(private travelRequestService: TravelRequestDetailsService) { }

  ngOnInit(): void {
    // this.employeeDetails = JSON.parse(sessionStorage.getItem('employee') || '{}');

    this.getAll();
  }
  allTravelRequests: TravelRequest[] = [];

  getAll() {
    this.travelRequestService.getAllTravelRequests().subscribe(data => {
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
      this.travelRequest.managerStatus = this.action;
      console.log(this.travelRequest);
      this.travelRequestService.updateTravelRequest(this.travelRequest).subscribe(data => {
      console.log(data);

      this.getAll();
      });
    });
  }
  onClickReject(travelRequestId: number) {
    this.action = 'REJECTED'
    console.log(travelRequestId);
    this.travelRequestService.getTravelRequestByTravelRequestId(travelRequestId).subscribe(data => {
      this.travelRequest = data;

      //update Object as Manager Status Rejected
      this.travelRequest.managerStatus = this.action;
      console.log(this.travelRequest);
      this.travelRequestService.updateTravelRequest(this.travelRequest).subscribe(data => {
        console.log(data);
        this.getAll();
      });

      console.log(data);
    });
  }

  onClickDetails(travelRequestId: number) {
    console.log(travelRequestId);


  }

}
