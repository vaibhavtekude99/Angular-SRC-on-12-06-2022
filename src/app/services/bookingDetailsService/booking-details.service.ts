import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingDetails } from 'src/app/pojo/BookingDetails';
import { TravelAgentDetails } from 'src/app/pojo/TravelAgentDetails'

@Injectable({
  providedIn: 'root'
})
export class BookingDetailsService {

      
  baseURL : string ="http://localhost:8080";
  constructor(private http: HttpClient)
   { 

   }
   travelAgentDetails:TravelAgentDetails=new TravelAgentDetails();
   

   getAllBookingDetails():Observable<BookingDetails[]>
   {
     return this.http.get<BookingDetails[]>(this.baseURL);
   }

  
   getBookingDetailsId(bookingId:number):Observable<BookingDetails>
   {
     console.log("inside service get Singlelogin method")
     return this.http.get<BookingDetails>(this.baseURL+'/'+bookingId);
   }
   addBookingDetails(bookingDetails:BookingDetails):Observable<boolean>
   {
    console.log('inside addBookingDetails() method  your booking object is below');
    console.log(bookingDetails);
    

    
       return this.http.post<boolean>(this.baseURL,bookingDetails)
   }

   getAgentDetailsByLoginId(loginId:number):Observable<TravelAgentDetails>
   {

              console.log('in the getAgentDetailsByLoginId() method ');
    
        return  this.http.get<TravelAgentDetails>('http://localhost:8080/travelAgentDetails/travelagent/'+loginId);
   }

}
