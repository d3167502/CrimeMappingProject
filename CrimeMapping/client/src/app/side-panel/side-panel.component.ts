import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  @Input() markers;
  @Input() mapRef;

  shown = true;
  zoomPlace: string;

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.shown = !this.shown;
  }

  onClickShow(): void {
    console.log('haha' + this.markers);
    this.mapRef.showListings();
  }

  onClickHide(): void {
    console.log('haha' + this.markers);
    this.mapRef.hideMarkers();
  }

  onClickZoom(): void {
    this.mapRef.zoomToArea();

  }
}
