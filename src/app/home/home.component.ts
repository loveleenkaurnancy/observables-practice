import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { error } from 'util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
      .map(
        (data:number) => {
          return data*2;
        }
      );
    this.numbersObsSubscription=myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>)=> {
      setTimeout(()=>{
        observer.next('First Package');
      },2000);
    
      setTimeout(()=>{
        observer.next('Second Package');
      },4000);

      setTimeout(()=>{
        // observer.error('This does not work');
        observer.complete();;
      },5000);

    });

    this.customObsSubscription=myObservable.subscribe(
      (data: string)=>{console.log(data);},
      (data: string)=>{console.error(error);},
      ()=>{console.log('completed');}
    );
  }

  ngOnDestroy(){
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}

