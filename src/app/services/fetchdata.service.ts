import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http: HttpClient) { }
  public subject = new BehaviorSubject<string>(null);
  public datasubcription = this.subject.asObservable();
  sendMessage(message: string) {
      this.subject.next(message );
  }

  getMessage(): Observable<string> {
      return this.subject.asObservable();
  }
 

}
