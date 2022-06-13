import { Injectable } from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import { SlabMaster } from 'src/app/pojo/SlabMaster';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlabMasterService {

  baseURL : string ="http://localhost:8080/slabmaster";

                      // http://localhost:8080/slabmaster/slab

  constructor(private http: HttpClient) { }

  getAllSlabDetails(): Observable<SlabMaster[]>
  {
    console.log('inside the getAll() method of slabService')
    return this.http.get<SlabMaster[]>(this.baseURL+'/slab/');
  }

 
  getSingleSlabDetailById(slabId:number):Observable<SlabMaster>
  {
    console.log("inside service get Singlelogin method")
    return this.http.get<SlabMaster>(this.baseURL+'/'+slabId);
  }
}
