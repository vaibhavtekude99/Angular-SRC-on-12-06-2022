import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlabMaster } from 'src/app/pojo/SlabMaster';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { SlabMasterService } from 'src/app/services/slabMasterService/slab-master.service';
import { TravelRequestDetailsService } from 'src/app/services/travelRequestDetailsService/travel-request-details.service';
import { RequestViewComponent } from '../request-view/request-view.component';

@Component({
  selector: 'app-slab-details',
  templateUrl: './slab-details.component.html',
  styleUrls: ['./slab-details.component.css']
})
export class SlabDetailsComponent implements OnInit {


  travelRequestId : number =  0;
  slabMasters: SlabMaster[] = [];
  options :string[]=['Select Status','Approve' , 'Reject']
  reasons:string[]=['Select Reason','SLAB NOT MATCHED','DOCUMENT NOT VERIFIED'];
  reason : string='';
  visible: boolean = true;
  action:string='';

  travelRequest:TravelRequest =new TravelRequest();

    validation:boolean=false;
  constructor(private slabMasterService: SlabMasterService , private route : ActivatedRoute,private travelRequestService:TravelRequestDetailsService,private router:Router) { }


  ngOnInit(): void {

    this.travelRequestId = this.route.snapshot.params['travelRequestId'];
    console.log(this.travelRequestId);
  
    this.slabMasterService.getAllSlabDetails().subscribe(data => {
      console.log(data);
      this.slabMasters = data;

      
      });
     
    this.travelRequestService.getTravelRequestByTravelRequestId(this.travelRequestId).subscribe(data=>{
       console.log('inside get travel requestId() output');
          
      console.log(data);
         this.travelRequest=data;
    });


  }
     
  onClickApprove(travelRequestId: number){
    this.travelRequestService.getTravelRequestByTravelRequestId(travelRequestId).subscribe(data=>{
         console.log('inside on click approve');     
      console.log(data);

            this.travelRequest=data;       
    });

  }
  onChange(event : Event)
  {
            
       console.log('inside change metho');
       console.log((<HTMLSelectElement>event.target).value);

       if((<HTMLSelectElement>event.target).value === 'Approve'){
       this.travelRequestService.getTravelRequestByTravelRequestId(this.travelRequestId).subscribe(data=>
        {
             console.log('inside get travel request by travelRequestId');
             console.log(data);
             this.travelRequest=data;
             this.travelRequest.agentStatus='APPROVED';
             this.travelRequestService.updateTravelRequestOfAgent(this.travelRequest).subscribe(data=>{
              console.log(data);

             });
        });
      }
       console.log(this.travelRequestId);
       if((<HTMLSelectElement>event.target).value === 'Reject'){
        this.visible = false;

   }
       

    this.travelRequestId
       
       //console.log(travelrequestId);
  }

  onClickReason(event: Event)
  {
     console.log((<HTMLSelectElement>event.target).value);
     
     this.reason=(<HTMLSelectElement>event.target).value;
     console.log(this.travelRequestId);
     


     this.travelRequestService.getTravelRequestByTravelRequestId(this.travelRequestId).subscribe(data=>{
           console.log(data);

           this.travelRequest=data;
           this.travelRequest.agentStatus=this.reason;
           this.travelRequest.directorStatus='PENDING';

           this.travelRequestService.updateTravelRequestOfAgent(this.travelRequest).subscribe(data=>{
            console.log(data);
           });

     });

  }
  onClickBooking(travelRequestId:number)
  {
    console.log(travelRequestId);

         this.router.navigate(['agenthome/bookingdetails',travelRequestId])
    
  }

}
