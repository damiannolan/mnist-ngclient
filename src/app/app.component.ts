import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private visible: boolean = false;
  private apiEndPoint: string = 'http://localhost:5000/upload';
  private image: string = '';
  private digit: number = 0;

  constructor() {}
}
