import { Component, Input, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PredictionService } from '../services/prediction.service';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent implements OnInit {
  /*
    - This Component has been adapted from the article linked below with a couple of minor changes made:
    https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415

    The article outlines how to use RxJS Observables to capture events on the HTML Canvas and then uses the native Canvas API for drawing.
  */

  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;
  private visible: boolean = false;
  private digit: number;

  constructor(private predictionService: PredictionService) { }

  ngOnInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // Fill the canvas with a black background
    this.cx.fillStyle = '#000';
    this.cx.fillRect(0, 0, this.width, this.height);

    // set some default properties about the line
    this.cx.lineWidth = 15;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#FFF';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      // this will capture all mousedown events from the canvas element
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          // after a mouse down, we'll record all mouse moves
          .fromEvent(canvasEl, 'mousemove')
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a mouseUp event
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // Call the draw method
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  private clearCanvas() {
    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.fillStyle = '#000';
    this.cx.fillRect(0, 0, this.width, this.height);
  }

  private predict() {
    // Use canvas.toBlob() to capture the canvas as an image file
    // And then make a request to the prediction service and display it to the user
    this.cx.canvas.toBlob((blob: Blob) => {
      const imageFile = new File([blob], 'canvas.png');
      const formData = new FormData();
      formData.append("file", imageFile, "canvas.png");
      console.log(imageFile);

      this.predictionService.predict(formData)
        .subscribe((body) => {
          console.log(body);
          this.digit = body;
          this.visible = true;
        });

    });
  }

}
