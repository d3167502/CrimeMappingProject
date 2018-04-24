import { Component, OnInit, Input, Output } from '@angular/core';
import { AddPanelComponent } from '../add-panel/add-panel.component';
import { DeletePanelComponent} from '../delete-panel/delete-panel.component';
import { AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  @Input('markers') markers;
  @Input('mapRef') mapRef;
  @Input('records') records;
  @Input() getAddress;
  // @Output() zoomPlace;

  @ViewChild(AddPanelComponent) addPanel: AddPanelComponent;
  @ViewChild(DeletePanelComponent) deletePanel: DeletePanelComponent;

  shown = true;
  zoomPlace: string;

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.shown = !this.shown;
  }

  onClickShow(): void {
    // console.log('haha' + this.markers);
    this.mapRef.showListings();
  }

  onClickHide(): void {
    // console.log('haha' + this.markers);
    this.mapRef.hideMarkers(this.mapRef.markers);
  }

  onClickZoom(): void {
    this.mapRef.zoomToArea();
  }

  OnClickDraw(): void {
    this.mapRef.toggleDrawing(this.mapRef.drawingManager);
  }
}
