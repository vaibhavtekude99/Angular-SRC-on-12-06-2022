import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { EmployeeDetails } from 'src/app/pojo/EmployeeDetails';
@Injectable({
  providedIn: 'root'
})
export class TravelRequestDetailsService 
{
  baseURL: string = "http://localhost:8080/travelRequestDetails";
                   // http://localhost:8080/travelRequestDetails/updaterequest
                   //http://localhost:8080/travelRequestDetails/travelrequest/501

                   //http://localhost:8080/travelRequestDetails/
    
  employeeDetails:EmployeeDetails;
  constructor(private http: HttpClient) {
    this.employeeDetails = JSON.parse(sessionStorage.getItem('employee') || '{}');
   }


  getAllTravelRequestDetails(employeeId:number): Observable<TravelRequest[]>
   {
     console.log('inside getAllTravelRequest');
    return this.http.get<TravelRequest[]>(this.baseURL+'/getallrequestbyemployeeid/'+this.employeeDetails.employeeId);
   }
   getAllTravelRequests(): Observable<TravelRequest[]>
   {
     console.log('inside getAllTravelRequests of Project Manager');
     console.log(this.employeeDetails.employeeId);
    return this.http.get<TravelRequest[]>(this.baseURL+'/getallrequestbymanagerno/'+this.employeeDetails.employeeId);
   }

   getAllAprovedTravelRequest()
   {
    console.log('inside getAllApprovedTravelRequests of ProjectManager');
    console.log(this.employeeDetails.employeeId);
   return this.http.get<TravelRequest[]>(this.baseURL+'/getallapprovedrequests');
   }


     getAllRejectedTravelRequests():Observable<TravelRequest[]>
     {
        return this.http.get<TravelRequest[]>(this.baseURL+'/getallrefusedrequests');
      
     }
   

  addNewTravelRequest(travelRequest: TravelRequest): Observable<boolean> {
    return this.http.post<boolean>(this.baseURL + '/travelrequest', travelRequest);
  }

  getSingleTravelRequestDetailById(loginId: number): Observable<TravelRequest> {
    console.log(loginId);
    console.log("inside service get Single Employe by loginId method")
    return this.http.get<TravelRequest>(this.baseURL + '/travelrequest');
  }

  getTravelRequestByTravelRequestId(travelRequestId:number) :Observable<TravelRequest>
  {
    console.log('inside the getTravelRequestByTravelRequestId');
    console.log(travelRequestId);
     return this.http.get<TravelRequest>(this.baseURL+'/travelrequest/'+travelRequestId);
  }

   updateTravelRequest(travelRequest:TravelRequest):Observable<boolean>
   {
     console.log('in the update travelRequest() method   Updated Object below  ');
     console.log(travelRequest);
     return this.http.put<boolean>(this.baseURL+'/updaterequest',travelRequest);
   }

   updateTravelRequestOfDirector(travelRequest:TravelRequest):Observable<boolean>
   {
     console.log('in the  updateTravelRequestOfDirector() method   Updated Object below  ');
     console.log(travelRequest);
     return this.http.put<boolean>(this.baseURL+'/updatedirectorstatus',travelRequest);
   }
   updateTravelRequestOfAgent(travelRequest:TravelRequest):Observable<boolean>
   {
     console.log('in the updateTravelRequestOfAgent() method   Updated Object below  ');
     console.log(travelRequest);
     return this.http.put<boolean>(this.baseURL+'/updateagentstatusifrejected',travelRequest);
   }

   getEmployeeDetails()
   {
       
   }

}

