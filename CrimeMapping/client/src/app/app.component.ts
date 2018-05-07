import { Component, ViewChildren, Output, EventEmitter, NgZone } from '@angular/core';
import {} from '@types/googlemaps';
import { AfterViewInit, ViewChild } from '@angular/core';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { AddPanelComponent } from './add-panel/add-panel.component';
import { DeletePanelComponent} from './delete-panel/delete-panel.component';
import { DbAccessorService } from './db-accessor.service';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DbAccessorService]
})

export class AppComponent {
  // @ViewChild('gmap') gmapElement: any;
  @ViewChild(SidePanelComponent) sidePanel: SidePanelComponent;
  @ViewChild(AddPanelComponent) addPanel: AddPanelComponent;
  @ViewChild(DeletePanelComponent) deletePanel: DeletePanelComponent;

  // @Output() addAddressChange = new EventEmitter();
  // @Output() zoomPlaceChange = new EventEmitter();

  map: google.maps.Map;
  google: any;
  geocoder: google.maps.Geocoder;
  title = 'Tian\'s app';
  // Create a new blank array for all the listing markers.
  markers: any[] = [];
  crimeRecords: any[];
  mapStyle: any[];
  currentMarker: any;
  selectedExistingMarker: any;
  test: any;
  selectedAddress: any;
  drawingManager: any;
  // largeInfowindow: any;
  // This global polygon variable is to ensure only ONE polygon is rendered.
  polygon = null;

  // Create placemarkers array to use in multiple functions to have control
  // over the number of places that show.
  placeMarkers: any[] = [];

  constructor(private dbAccessor: DbAccessorService, private http: Http, private zone: NgZone) {
    // this.crimeRecords =  this.dbAccessor.getAll();
    this.dbAccessor.getAll()
        .subscribe(rtn => {
            this.crimeRecords = rtn;
            this.LoadMarkers();
            console.log(this.crimeRecords);
        });
    // this.getMapStyle()
    // .subscribe(
    //   rtn => {this.mapStyle = rtn;
    //     this.google = google;
    //     this.LoadMap();
    //    }
    // );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const styles = [
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#ebe3cd'
          }
        ]
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#523735'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#f5f1e6'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#c9b2a6'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#dcd2be'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#ae9e90'
          }
        ]
      },
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#93817c'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#a5b076'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#447530'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f1e6'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#fdfcf8'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f8c967'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#e9bc62'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e98d58'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#db8555'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#806b63'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#8f7d77'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#ebe3cd'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#b9d3c2'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#92998d'
          }
        ]
      }
    ];
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.51157, lng: -122.134},
      zoom: 11,
      styles: styles,
      mapTypeControl: false
    });

    this.map.addListener('click', (e) => {
      this.placeMarker(e.latLng, this.map);
    });

    // console.log(this.mapStyle);
    // console.log(this.crimeRecords);

    this.geocoder = new google.maps.Geocoder();

    // This autocomplete is for use in the search within time entry box.
    const timeAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('search-within-time-text'));
    // This autocomplete is for use in the geocoder entry box.
    const zoomAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('zoom-to-area-text'));
    // Bias the boundaries within the map for the zoom to area text.
    zoomAutocomplete.bindTo('bounds', this.map);

    console.log(this.crimeRecords);
    console.log(this.sidePanel);

    const largeInfowindow = new google.maps.InfoWindow();

    // Initialize the drawing manager.
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });

    // Add an event listener so that the polygon is captured,  call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hide any outside of it.
    this.drawingManager.addListener('overlaycomplete', (event) => {
      // First, check if there is an existing polygon.
      // If there is, get rid of it and remove the markers
      if (this.polygon) {
        this.polygon.setMap(null);
        this.hideMarkers(this.markers);
      }
      // Switching the drawing mode to the HAND (i.e., no longer drawing).
      this.drawingManager.setDrawingMode(null);
      // Creating a new editable polygon from the overlay.
      this.polygon = event.overlay;
      this.polygon.setEditable(true);
      // Searching within the polygon.
      this.searchWithinPolygon();
      // Make sure the search is re-done if the poly is changed.
      this.polygon.getPath().addListener('set_at', this.searchWithinPolygon);
      this.polygon.getPath().addListener('insert_at', this.searchWithinPolygon);
    });

  }

  LoadMap() {
    const styles = this.mapStyle;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.51157, lng: -122.134},
      zoom: 11,
      styles: this.mapStyle,
      mapTypeControl: false
    });
    console.log(this.mapStyle);
    console.log(this.crimeRecords);
    const geocoder = new google.maps.Geocoder();

    // This autocomplete is for use in the search within time entry box.
    const timeAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('search-within-time-text'));
    // This autocomplete is for use in the geocoder entry box.
    const zoomAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('zoom-to-area-text'));
    // Bias the boundaries within the map for the zoom to area text.
    zoomAutocomplete.bindTo('bounds', this.map);

    console.log(this.crimeRecords);
    console.log(this.sidePanel);

    const largeInfowindow = new google.maps.InfoWindow();

    // Initialize the drawing manager.
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });

  }

  // This function will loop through the markers array and display them all.
  showListings() {
    const bounds = new google.maps.LatLngBounds();
    console.log('this.markers.length:' + this.markers.length);
    console.log(this.markers);
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(this.map);
      bounds.extend(this.markers[i].position);
    }
    this.map.fitBounds(bounds);
  }
  // This function will loop through the listings and hide them all.
  hideMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  checkMarkers() {
    console.log('check marker' + this.markers);
  }

  // This function takes the input value in the find nearby area text input
  // locates it, and then zooms into that area. This is so that the user can
  // show all listings, then decide to focus on one area of the map.
  zoomToArea() {
    // Initialize the geocoder.
    // const geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.

    // const a = document.getElementById('zoom-to-area-text');
    console.log('zoomToArea');
    console.log(this);
    const address = this.sidePanel.zoomPlace;
    console.log(address);

    // Make sure the address isn't blank.
    if (address === '') {
      window.alert('You must enter an area, or address.');
    } else {
      // Geocode the address/area entered to get the center. Then, center the map
      // on it and zoom in
      this.geocoder.geocode(
        { address: address,
          componentRestrictions: {locality: 'California'}
        }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            console.log(results[0].geometry.location.lat());
            // const latlng = new google.maps.LatLng(39.51157, -132.134);
            this.map.setZoom(13);
            this.map.setCenter(results[0].geometry.location);
          } else {
            window.alert('We could not find that location - try entering a more' +
                ' specific place.');
          }
        });
      }
    }

    LoadMarkers() {
    this.markers = [];
    const largeInfowindow = new google.maps.InfoWindow();
    // Style the markers a bit. This will be our listing marker icon.

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    const highlightedIcon = this.makeMarkerIcon('highlighted');

    // The following group uses the location array to create an array of markers on initialize.
    console.log(this.crimeRecords.length);
    for (let i = 0; i < this.crimeRecords.length; i++) {
      // Get the position from the location array.
      const position = this.crimeRecords[i].location;
      const time = this.crimeRecords[i].time;
      const title = this.crimeRecords[i].type;
      const _id = this.crimeRecords[i]._id;
      const defaultIcon = this.makeMarkerIcon(title);
      // Create a marker per location, and put into markers array.
      const marker = new google.maps.Marker({
        position: position,
        title: title + '|' + time,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: _id
      });
        // Push the marker to our array of markers.
      this.markers.push(marker);
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', () => {
        this.populateInfoWindow(marker, largeInfowindow);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }
    }

    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    makeMarkerIcon(crimeType: string ) {
      const markerImage = new google.maps.MarkerImage(
        '../assets/img/' + crimeType + '.png',
        new google.maps.Size(48, 48),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(44, 44));
      return markerImage;
    }


    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    populateInfoWindow(marker, infowindow) {
      console.log('CLICK on existing icon');
      this.selectedExistingMarker = marker;
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker !== marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
        });
        const streetViewService = new google.maps.StreetViewService();
        const radius = 50;
        const terms = marker.title.split('|');
        const type = terms[0];
        const time = terms[1];
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position

        streetViewService.getPanoramaByLocation(marker.position, radius, (data, status) => {
          this.zone.run(() => {
            if (status === google.maps.StreetViewStatus.OK) {
              console.log('Showing info window');
              console.log('data');
              const nearStreetViewLocation = data.location.latLng;
              const heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                // tslint:disable-next-line:max-line-length
                infowindow.setContent('<div style="width:400px; height:400px">' + '<div style="font-weight: bold">' + type + '</div><div style="font-weight: bold">' + 'Time: ' + time + '</div><div style="width:400px; height:360px" id="pano">zzz</div></div>');
                const panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              const panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
                console.log(panorama);
              if (this.currentMarker != null) {
                this.currentMarker.setMap(null);
              }
              this.sidePanel.addPanel.addAddress = data.location.description;
              this.sidePanel.deletePanel.deleteAddress = data.location.description;
            } else {
              // tslint:disable-next-line:max-line-length
              infowindow.setContent('<div style="font-weight: bold">' + type + '</div><div style="font-weight: bold">' + 'Time: ' + time + '</div>' +
              '<div>No Street View Found</div>');
              this.sidePanel.addPanel.addAddress = '';
              this.sidePanel.deletePanel.deleteAddress = '';
            }
          });
        });
        // Open the infowindow on the correct marker.
        infowindow.open(this.map, marker);
      }
    }

    addSearch(tag: string) {
      // This autocomplete is for use in the geocoder entry box.
      const addAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById(tag));
      // Bias the boundaries within the map for the zoom to area text.
      addAutocomplete.bindTo('bounds', this.map);
    }

    getMapStyle() {
      // get users from api
      return this.http.get('../assets/img/mapStyle.json')
          .map(res => res.json());
    }

    placeMarker(position, map) {
      if (this.currentMarker != null) {
        this.currentMarker.setMap(null);
      }
      const defaultIcon = this.makeMarkerIcon('highlighted');
      console.log(position);
      const lat = position.lat();
      const lng = position.lng();
      const latlng = {lat: lat, lng: lng};
      this.geocoder.geocode({'location': latlng}, (results, status) => {
        this.zone.run(() => {   // useing Zone here because the Binding Model is not updating the UI
          console.log(results[0].formatted_address);
          this.sidePanel.addPanel.addAddress = results[0].formatted_address;
          this.sidePanel.deletePanel.deleteAddress = results[0].formatted_address;
          this.sidePanel.zoomPlace = results[0].formatted_address;
          // this.sidePanel.deletePanel.onClick();
        });
        // this.selectedAddress = results[0].formatted_address;
        // this.sidePanel.addPanel.ngOnInit();
      });
      this.currentMarker = new google.maps.Marker({
        position: position,
        icon: defaultIcon,
        map: this.map
      });
  }
    // This shows and hides (respectively) the drawing options.
    toggleDrawing(drawingManager) {
      if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew anything, get rid of the polygon
        if (this.polygon !== null) {
          this.polygon.setMap(null);
        }
      } else {
        drawingManager.setMap(this.map);
      }
    }

    // This function hides all markers outside the polygon,
    // and shows only the ones within it. This is so that the
    // user can specify an exact area of search.
    searchWithinPolygon() {
      for (let i = 0; i < this.markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(this.markers[i].position, this.polygon)) {
          this.markers[i].setMap(this.map);
        } else {
          this.markers[i].setMap(null);
        }
      }
    }

    // This function allows the user to input a desired travel time, in
    // minutes, and a travel mode, and a location - and only show the listings
    // that are within that travel time (via that travel mode) of the location
    searchWithinTime() {
      // Initialize the distance matrix service.
      const distanceMatrixService = new google.maps.DistanceMatrixService;
      const address = this.sidePanel.searchTimeAddress;
      // Check to make sure the place entered isn't blank.
      if (address === '') {
        window.alert('You must enter an address.');
      } else {
        this.hideMarkers(this.markers);
        // Use the distance matrix service to calculate the duration of the
        // routes between all our markers, and the destination address entered
        // by the user. Then put all the origins into an origin matrix.
        const origins = [];
        for (let i = 0; i < this.markers.length; i++) {
          origins[i] = this.markers[i].position;
        }
        const destination = address;
        const mode = this.sidePanel.travelMode;
        // Now that both the origins and destination are defined, get all the
        // info for the distances between them.
        distanceMatrixService.getDistanceMatrix({
          origins: origins,
          destinations: [destination],
          travelMode: google.maps.TravelMode[mode],
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, (response, status) => {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            window.alert('Error was: ' + status);
          } else {
            this.displayMarkersWithinTime(response);
          }
        });
      }
    }

    // This function will go through each of the results, and,
    // if the distance is LESS than the value in the picker, show it on the map.
    displayMarkersWithinTime(response) {
      const maxDuration = this.sidePanel.maxDuration;
      const origins = response.originAddresses;
      const destinations = response.destinationAddresses;
      // Parse through the results, and get the distance and duration of each.
      // Because there might be  multiple origins and destinations we have a nested loop
      // Then, make sure at least 1 result was found.
      let atLeastOne = false;
      for (let i = 0; i < origins.length; i++) {
        const results = response.rows[i].elements;
        for (let j = 0; j < results.length; j++) {
          const element = results[j];
          if (element.status === 'OK') {
            // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch
            // the function to show markers within a user-entered DISTANCE, we would need the
            // value for distance, but for now we only need the text.
            const distanceText = element.distance.text;
            // Duration value is given in seconds so we make it MINUTES. We need both the value
            // and the text.
            const duration = element.duration.value / 60;
            const durationText = element.duration.text;
            if (duration <= maxDuration) {
              // the origin [i] should = the markers[i]
              this.markers[i].setMap(this.map);
              atLeastOne = true;
              // Create a mini infowindow to open immediately and contain the
              // distance and duration
              const infowindow = new google.maps.InfoWindow();
              infowindow.addListener('click', () => {
                console.log('yeah');
              });
              const infoContent = durationText + ' away, ' + distanceText +
              '<div><input id=\"eee' + i + '\" type=\"button\" value=\"View Route\"></input></div>';
              infowindow.setContent(infoContent);
              infowindow.open(this.map, this.markers[i]);
              // this.displayDirections(origins[i]);
              // Put this in so that this small window closes if the user clicks
              // the marker, when the big infowindow opens

              this.markers[i].infowindow = infowindow;
              google.maps.event.addListener(infowindow, 'domready', () => {
                // now my elements are ready for dom manipulation
                const clickableItem = document.getElementById('eee' + i + '');
                clickableItem.addEventListener('click', () => {
                  this.displayDirections(origins[i]);
                });
              });
              google.maps.event.addListener(this.markers[i], 'click', () => {
                infowindow.close();
              });
              // return ;
            }
          }
        }
      }
      if (!atLeastOne) {
        window.alert('We could not find any locations within that distance!');
      }
    }

    test2() {
      console.log('Just a test..');
    }
    // This function is in response to the user selecting "show route" on one
    // of the markers within the calculated distance. This will display the route
    // on the map.
    displayDirections(origin) {
      console.log('showing direction');
      this.hideMarkers(this.markers);
      const directionsService = new google.maps.DirectionsService;
      // Get the destination address from the user entered value.
      const destinationAddress = this.sidePanel.searchTimeAddress;
      // Get mode again from the user entered value.
      const mode = this.sidePanel.travelMode;
      directionsService.route({
        // The origin is the passed in marker's position.
        origin: origin,
        // The destination is user entered address.
        destination: destinationAddress,
        travelMode: google.maps.TravelMode[mode]
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map,
            directions: response,
            draggable: true,
            polylineOptions: {
              strokeColor: 'green'
            }
          });
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }




}
