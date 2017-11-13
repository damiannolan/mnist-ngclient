import { Component } from '@angular/core';
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
  private image: string = '';
  private digit: number = 0;

  constructor(private http: Http) {}

  predict() {
    this.visible = true;
  }

  imageUpload(event) {
    // https://stackoverflow.com/questions/39933340/angular2-display-image
    let fileList: FileList = event.target.files;

    this.image = event.target.files[0];

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);

    if(fileList.length > 0) {
        console.log('posting');
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        //headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json');

        //let options = new RequestOptions({ headers: headers, responseType:ResponseContentType.Blob });
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .subscribe((body) => {
              // return the body where the digit prediction will be held
              console.log(body);
              //this.image = window.URL.createObjectURL(blob);
          });
    }
  }
}
