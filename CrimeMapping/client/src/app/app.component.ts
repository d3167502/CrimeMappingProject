import { Component } from '@angular/core';
import {} from '@types/googlemaps';
import { AfterViewInit, ViewChild } from '@angular/core';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DbAccessorService } from './db-accessor.service';
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DbAccessorService]
})

export class AppComponent {
  // @ViewChild('gmap') gmapElement: any;
  @ViewChild(SidePanelComponent)
  private sidePanel: SidePanelComponent;
  map: google.maps.Map;
  title = 'Tian\'s app';
  // Create a new blank array for all the listing markers.
  markers: any[] = [];
  crimeRecords: any[];
  // largeInfowindow: any;
  // This global polygon variable is to ensure only ONE polygon is rendered.
  polygon = null;

  // Create placemarkers array to use in multiple functions to have control
  // over the number of places that show.
  placeMarkers: any[] = [];

  constructor(private dbAccessor: DbAccessorService) {
    // this.crimeRecords =  this.dbAccessor.getAll();
    this.dbAccessor.getAll()
        .subscribe(rtn => {
            this.crimeRecords = rtn;
            this.LoadMarkers();
            console.log(this.crimeRecords);
        });
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

    console.log(this.crimeRecords);
    // // This autocomplete is for use in the search within time entry box.
    // const timeAutocomplete = new google.maps.places.Autocomplete(
    //   document.getElementById('search-within-time-text'));
    // // This autocomplete is for use in the geocoder entry box.
    // const zoomAutocomplete = new google.maps.places.Autocomplete(
    //   document.getElementById('zoom-to-area-text'));
    // // Bias the boundaries within the map for the zoom to area text.
    //   zoomAutocomplete.bindTo('bounds', this.map);
    // // Create a searchbox in order to execute a places search
    // const searchBox = new google.maps.places.SearchBox(
    //   document.getElementById('places-search'));
    // // Bias the searchbox to within the bounds of the map.
    // searchBox.setBounds(this.map.getBounds());

    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    const locations = [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ];

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

    // document.getElementById('show-listings').addEventListener('click', this.showListings);

    // document.getElementById('hide-listings').addEventListener('click', hideMarkers);

      // document.getElementById('toggle-drawing').addEventListener('click', function() {
      //   toggleDrawing(drawingManager);
      // });

      // document.getElementById('zoom-to-area').addEventListener('click', function() {
      //   zoomToArea();
      // });

      // document.getElementById('search-within-time').addEventListener('click', function() {
      //   searchWithinTime();
      // });

      // // Listen for the event fired when the user selects a prediction from the
      // // picklist and retrieve more details for that place.
      // searchBox.addListener('places_changed', function() {
      //   searchBoxPlaces(this);
      // });

      // // Listen for the event fired when the user selects a prediction and clicks
      // // "go" more details for that place.
      // document.getElementById('go-places').addEventListener('click', textSearchPlaces);

      // // Add an event listener so that the polygon is captured,  call the
      // // searchWithinPolygon function. This will show the markers in the polygon,
      // // and hide any outside of it.
      // drawingManager.addListener('overlaycomplete', function(event) {
      //   // First, check if there is an existing polygon.
      //   // If there is, get rid of it and remove the markers
      //   if (polygon) {
      //     polygon.setMap(null);
      //     hideMarkers(markers);
      //   }
      //   // Switching the drawing mode to the HAND (i.e., no longer drawing).
      //   drawingManager.setDrawingMode(null);
      //   // Creating a new editable polygon from the overlay.
      //   polygon = event.overlay;
      //   polygon.setEditable(true);
      //   // Searching within the polygon.
      //   searchWithinPolygon(polygon);
      //   // Make sure the search is re-done if the poly is changed.
      //   polygon.getPath().addListener('set_at', searchWithinPolygon);
      //   polygon.getPath().addListener('insert_at', searchWithinPolygon);
      // });

  }

  // This function will loop through the markers array and display them all.
  showListings() {
    const bounds = new google.maps.LatLngBounds();
    console.log('3' + this.markers);
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(this.map);
      bounds.extend(this.markers[i].position);
    }
    this.map.fitBounds(bounds);
  }
  // This function will loop through the listings and hide them all.
  hideMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
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
    const geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.

    // const address = document.getElementById('zoom-to-area-text').value;
    const address = this.sidePanel.zoomPlace;

    // Make sure the address isn't blank.
    if (address === '') {
      window.alert('You must enter an area, or address.');
    } else {
      // Geocode the address/area entered to get the center. Then, center the map
      // on it and zoom in
      geocoder.geocode(
        { address: address,
          componentRestrictions: {locality: 'New York'}
        }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            // const latlng = new google.maps.LatLng(39.51157, -132.134);
            this.map.setZoom(15);
            this.map.setCenter(results[0].geometry.location);
          } else {
            window.alert('We could not find that location - try entering a more' +
                ' specific place.');
          }
        });
      }
    }

    LoadMarkers() {
    const largeInfowindow = new google.maps.InfoWindow();
    // Style the markers a bit. This will be our listing marker icon.

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    const highlightedIcon = this.makeMarkerIcon('highlighted');

    // The following group uses the location array to create an array of markers on initialize.
    for (let i = 0; i < this.crimeRecords.length; i++) {
      // Get the position from the location array.
      const position = this.crimeRecords[i].location;
      const time = this.crimeRecords[i].time;
      const title = this.crimeRecords[i].type;
      const defaultIcon = this.makeMarkerIcon(title);
      // Create a marker per location, and put into markers array.
      const marker = new google.maps.Marker({
        position: position,
        title: title + '|' + time,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
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
      console.log('CLICK on icon');
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
          if (status === google.maps.StreetViewStatus.OK) {
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
          } else {
            // tslint:disable-next-line:max-line-length
            infowindow.setContent('<div style="font-weight: bold">' + type + '</div><div style="font-weight: bold">' + 'Time: ' + time + '</div>' +
            '<div>No Street View Found</div>');
          }
        });
        // Open the infowindow on the correct marker.
        infowindow.open(this.map, marker);
      }
    }
}
