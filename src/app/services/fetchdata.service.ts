import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http: HttpClient) { }
  public subject = new BehaviorSubject<any>(null);
  public datasubcription = this.subject.asObservable();
  sendMessage(message: any) {
      this.subject.next(message );
  }

 

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
 

}
