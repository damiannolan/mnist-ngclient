import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  private visible: boolean = false;
  private imageFile: File;
  private digit: number = 0;

  private requestData: FormData;

  constructor(private predictionService: PredictionService) { }

  ngOnInit() {
  }

  predict() {
    this.predictionService.predict(this.requestData)
      .subscribe((body) => {
        this.digit = body;
      });
    this.visible = true;
  }

  imageUpload(evt) {
    // https://stackoverflow.com/questions/39074806/how-to-preview-picture-stored-in-the-fake-path-in-angular-2-typescript
    // https://stackoverflow.com/questions/39933340/angular2-display-image
    let fileList: FileList = evt.target.files;
    //let file = fileList[0];
    this.imageFile = fileList[0];

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageFile = e.target.result;
    }

    reader.readAsDataURL(this.imageFile);
    console.log(this.imageFile);
    /*
      - Take this logic and put it into the predict() function
    */
    if(fileList[0] && this.imageFile) {
        let file: File = fileList[0];
        //let formData:FormData = new FormData();
        this.requestData = new FormData();
        this.requestData.append('file', file, file.name);
    }
  }
}
