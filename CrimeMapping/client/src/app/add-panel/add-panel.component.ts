import { Component, OnInit, Input, OnChanges, Output, NgZone } from '@angular/core';
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
  constructor(private dbAccessor: DbAccessorService, private zone: NgZone) {
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
    let lat: any;
    let lng: any;
    console.log('Adding one');
    console.log(this.markers);
    this.mapRef.geocoder.geocode(
      { address: this.addAddress,
        componentRestrictions: {locality: 'California'}
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          console.log(results);
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          console.log(lat);
          const newRecord = {
            location: {lat: lat, lng: lng},
            address: this.addAddress,
            time: time,
            type: type
          };
          console.log(newRecord);
          this.dbAccessor.addOne(newRecord).subscribe(
            record => this.zone.run(() => {
            this.mapRef.crimeRecords.push(record);
            console.log('after reload records..');
            console.log(this.mapRef.crimeRecords);
            // this.mapRef.hideMarkers();
            // ===========
            const largeInfowindow = new google.maps.InfoWindow();
            const position = record.location;
            const _time = record.time;
            const title = record.type;
            const _id = record._id;
            const defaultIcon = this.mapRef.makeMarkerIcon(title);
            const highlightedIcon = this.mapRef.makeMarkerIcon('highlighted');
            // Create a marker per location, and put into markers array.
            const marker = new google.maps.Marker({
              position: position,
              title: title + '|' + _time,
              animation: google.maps.Animation.DROP,
              icon: defaultIcon
            });
            marker.set('id', _id);
              // Push the marker to our array of markers.
            this.mapRef.markers.push(marker);
            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', () => {
              this.mapRef.populateInfoWindow(marker, largeInfowindow);
            });
            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            marker.addListener('mouseover', function() {
              this.mapRef.setIcon(this.mapRef.highlightedIcon);
            });
            marker.addListener('mouseout', function() {
              this.mapRef.setIcon(defaultIcon);
            });
            // ===========
            // this.mapRef.LoadMarkers();


            console.log('after reload markers..');
            console.log(this.mapRef.markers);
            this.mapRef.markers[this.mapRef.markers.length - 1].setMap(this.mapRef.map);
            }));
              // Push the marker to our array of markers.
             // this.markers.push(marker);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      });
      this.mapRef.currentMarker.setMap(null);
  }
}
