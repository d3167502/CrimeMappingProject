import { Component, OnInit, Input, OnChanges, Output, NgZone } from '@angular/core';
import { DbAccessorService } from '../db-accessor.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-delete-panel',
  templateUrl: './delete-panel.component.html',
  styleUrls: ['./delete-panel.component.css']
})
export class DeletePanelComponent implements OnInit {

  isClick = false;
  deleteAddress: any;
  @Input() markers;
  @Input() mapRef;
  @Input() records;

  constructor(private dbAccessor: DbAccessorService, private zone: NgZone) { }

  ngOnInit() {
  }

  onClick(): void {
    this.isClick = !this.isClick;
    console.log('Clicked Delete');
  }

  deleteRecord(): void {
    const id = this.mapRef.selectedExistingMarker.id;
    console.log(this.mapRef.selectedExistingMarker);
    this.dbAccessor.deleteOne(id).subscribe(
      (res) => this.zone.run(() => {
        console.log(' Delete response');
        console.log(res);
        const rec = this.mapRef.crimeRecords;
        console.log('records & mks');
        console.log(rec);
        // tslint:disable-next-line:triple-equals
        if (res.n == 1) {
          for (let i = 0; i < rec.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (rec[i]._id == id) {
              this.mapRef.crimeRecords.splice(i , 1);
            }
          }
          for (let i = 0; i < this.mapRef.markers.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (this.mapRef.markers[i].id == id) {
              console.log('hehe');
              this.mapRef.markers[i].setMap(null);
              this.mapRef.markers[0].setMap(null);
            }
          }
          // this.mapRef.LoadMarkers();
        }
        console.log('Double check records & mks');
        console.log(rec);
        console.log(this.mapRef.markers);
      }
    ));
  }
}
