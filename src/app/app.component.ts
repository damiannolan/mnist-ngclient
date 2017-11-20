import { Component, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private visible: boolean = false;
  private apiEndPoint: string = 'http://localhost:5000/upload';
  private image;
  private digit: number = 0;

  constructor(private http: Http) {}

  predict() {
    this.visible = true;
  }

  imageUpload(evt) {
    // https://stackoverflow.com/questions/39074806/how-to-preview-picture-stored-in-the-fake-path-in-angular-2-typescript
    // https://stackoverflow.com/questions/39933340/angular2-display-image
    let fileList: FileList = evt.target.files;
    //let file = fileList[0];
    this.image = fileList[0];

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    }

    reader.readAsDataURL(this.image);
    console.log(this.image);
    /*
      - Take this logic and put it into the predict() function
    */
    if(fileList[0] && this.image) {
        console.log('posting');
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();

        //let options = new RequestOptions({ headers: headers, responseType:ResponseContentType.Blob });
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .subscribe((body) => {
              // return the body where the digit prediction will be held
              console.log(body);
              //this.image = window.URL.createObjectURL(blob);
              this.digit = body;
          });
    }
  }
}
