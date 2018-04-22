import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DbAccessorService } from '../db-accessor.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.css']
})
export class AddPanelComponent implements OnInit, AfterViewInit {

  // dbAccessor: any;
  isClick = false;
  addAddress: any;
  @Input() markers;
  @Input() mapRef;
  @Input() records;

  // use "private here so that we dont have to use this.db = db"
  constructor(private dbAccessor: DbAccessorService) {
  }

  ngOnInit() {
    this.mapRef.addSearch('add-address');
  }

  ngAfterViewInit() {
  }

  onClick(): void {
    this.isClick = !this.isClick;
    // this.mapRef.addSearch('add-address');
  }

  addRecord(time: string, type: string) {
    let loc: any;
    console.log('Adding one');
    console.log(this.markers);
    this.mapRef.geocoder.geocode(
      { address: this.addAddress,
        componentRestrictions: {locality: 'California'}
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          console.log(results);
          loc = results[0].geometry.location;
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      });
    const newRecord = {
      location: loc,
      address: this.addAddress,
      time: time,
      type: type
    };
    console.log(newRecord);
    this.dbAccessor.addOne(newRecord).subscribe(
      record => {this.records.push(record);
      this.mapRef.hideMarkers();
      this.mapRef.LoadMarkers();
      this.mapRef.showListings();
      }
    );
  }
}
