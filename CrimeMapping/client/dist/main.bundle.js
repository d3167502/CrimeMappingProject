webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-panel/add-panel.component.css":
/***/ (function(module, exports) {

module.exports = "#address #time #type{\n    margin-left: 5px;\n    width: 90%;\n    display:inline-block;\n}\n\n.btn-success{\n    margin-top: 10px;\n}\n\n.custom{\n    margin-top: 20px;\n}\n\n.right{\n    float: right;\n    margin-right: 5px;\n    margin-bottom: 10px;\n}\n\n#addPanel {\n    margin-bottom: 20px;\n}"

/***/ }),

/***/ "./src/app/add-panel/add-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"> -->\n<div>\n  <button type=\"button\" class=\"btn btn-success btn-block custom\" (click)=\"onClick()\">Add a report here</button>\n  <!-- <input class ='longButton' type=\"button\" value=\"Add a case here\" (click)=\"onClick()\"> -->\n</div>\n<div [ngClass]=\"{'d-none':this.isClick === false}\" id=\"addPanel\">\n  <form class='addForm' (submit)='addRecord(crimeTime.value, crimeType.value)'>\n    <br/>\n    <span class=\"text\">Click on the map or enter a location:</span>\n    <input [(ngModel)]=\"addAddress\" name=\"address\" id=\"add-address\" class=\"form-control\" type=\"text\" placeholder=\"Ex: 5604 Melodia Cir, Dublin, CA\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\"><br/>\n    <span class=\"text\">Time:</span>\n    <input #crimeTime id=\"time\" type=\"date\" placeholder=\"Ex: 01/01/2018\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\"><br/>\n    <span class='text'> Type:</span>\n    <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n    <select id=\"type\" class=\"custom-select\" #crimeType>\n      <option value=\"Assault\" class=\"glyphicon glyphicon-certificate\"><span class=\"glyphicon glyphicon-certificate\" aria-hidden=\"true\"></span>Assault</option>\n      <option value=\"Drugs\" class=\"glyphicon glyphicon-cloud\">Drugs</option>\n      <option value=\"Robbery\" data-icon=\"glyphicon-registration-mark\">Robbery</option>\n      <option value=\"Weapon\" data-icon=\"glyphicon-warning-sign\">Weapon</option>\n      <option value=\"Theft\" data-icon=\"glyphicon-eye-open\">Theft</option>\n    </select>\n    <br/>\n    <!-- <input id=\"go-places\" type=\"button\" value=\"Submit\"> -->\n    <button type=\"submit\" class=\"btn btn-success right\">Submit</button>\n    <br/>\n  </form>\n<div> \n"

/***/ }),

/***/ "./src/app/add-panel/add-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_accessor_service__ = __webpack_require__("./src/app/db-accessor.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddPanelComponent = /** @class */ (function () {
    // use "private here so that we dont have to use this.db = db"
    function AddPanelComponent(dbAccessor) {
        this.dbAccessor = dbAccessor;
        // dbAccessor: any;
        this.isClick = false;
    }
    AddPanelComponent.prototype.ngOnInit = function () {
        this.mapRef.addSearch('add-address');
    };
    AddPanelComponent.prototype.ngAfterViewInit = function () {
    };
    AddPanelComponent.prototype.onClick = function () {
        this.isClick = !this.isClick;
        // this.mapRef.addSearch('add-address');
    };
    AddPanelComponent.prototype.addRecord = function (time, type) {
        var _this = this;
        var loc;
        console.log('Adding one');
        console.log(this.markers);
        this.mapRef.geocoder.geocode({ address: this.addAddress,
            componentRestrictions: { locality: 'California' }
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log(results);
                loc = results[0].geometry.location;
            }
            else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
            }
        });
        var newRecord = {
            location: loc,
            address: this.addAddress,
            time: time,
            type: type
        };
        console.log(newRecord);
        this.dbAccessor.addOne(newRecord).subscribe(function (record) {
            _this.records.push(record);
            _this.mapRef.hideMarkers();
            _this.mapRef.LoadMarkers();
            _this.mapRef.showListings();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], AddPanelComponent.prototype, "markers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], AddPanelComponent.prototype, "mapRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], AddPanelComponent.prototype, "records", void 0);
    AddPanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-add-panel',
            template: __webpack_require__("./src/app/add-panel/add-panel.component.html"),
            styles: [__webpack_require__("./src/app/add-panel/add-panel.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__db_accessor_service__["a" /* DbAccessorService */]])
    ], AddPanelComponent);
    return AddPanelComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "#map {\n    bottom:0px;\n    height: 100%;\n    left: 20%;\n    position: absolute;\n    width: 80%;\n  }\n\n#pano {\n    width: 1000; \n    height: 1000;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"container22\">\n    <app-side-panel [mapRef]='this' [markers]='this.markers' [records]='this.crimeRecords'></app-side-panel>\n    <app-map id=\"map\"></app-map>\n</div>\n\n\n<!-- <script>\n    var map;\n\n    // Create a new blank array for all the listing markers.\n    var markers = [];\n\n    // This global polygon variable is to ensure only ONE polygon is rendered.\n    var polygon = null;\n\n    // Create placemarkers array to use in multiple functions to have control\n    // over the number of places that show.\n    var placeMarkers = [];\n\n    function initMap() {\n      // Create a styles array to use with the map.\n      var styles = [\n        {\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#ebe3cd\"\n            }\n          ]\n        },\n        {\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#523735\"\n            }\n          ]\n        },\n        {\n          \"elementType\": \"labels.text.stroke\",\n          \"stylers\": [\n            {\n              \"color\": \"#f5f1e6\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"administrative\",\n          \"elementType\": \"geometry.stroke\",\n          \"stylers\": [\n            {\n              \"color\": \"#c9b2a6\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"administrative.land_parcel\",\n          \"elementType\": \"geometry.stroke\",\n          \"stylers\": [\n            {\n              \"color\": \"#dcd2be\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"administrative.land_parcel\",\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#ae9e90\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"landscape.natural\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#dfd2ae\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"poi\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#dfd2ae\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"poi\",\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#93817c\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"poi.park\",\n          \"elementType\": \"geometry.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#a5b076\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"poi.park\",\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#447530\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#f5f1e6\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road.arterial\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#fdfcf8\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road.highway\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#f8c967\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road.highway\",\n          \"elementType\": \"geometry.stroke\",\n          \"stylers\": [\n            {\n              \"color\": \"#e9bc62\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road.highway.controlled_access\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#e98d58\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road.highway.controlled_access\",\n          \"elementType\": \"geometry.stroke\",\n          \"stylers\": [\n            {\n              \"color\": \"#db8555\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"road.local\",\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#806b63\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"transit.line\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#dfd2ae\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"transit.line\",\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#8f7d77\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"transit.line\",\n          \"elementType\": \"labels.text.stroke\",\n          \"stylers\": [\n            {\n              \"color\": \"#ebe3cd\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"transit.station\",\n          \"elementType\": \"geometry\",\n          \"stylers\": [\n            {\n              \"color\": \"#dfd2ae\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"water\",\n          \"elementType\": \"geometry.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#b9d3c2\"\n            }\n          ]\n        },\n        {\n          \"featureType\": \"water\",\n          \"elementType\": \"labels.text.fill\",\n          \"stylers\": [\n            {\n              \"color\": \"#92998d\"\n            }\n          ]\n        }\n      ];\n\n      // Constructor creates a new map - only center and zoom are required.\n      map = new google.maps.Map(document.getElementById('map'), {\n        center: {lat: 37.51157, lng: -122.134},\n        zoom: 11,\n        styles: styles,\n        mapTypeControl: false\n      });\n\n      // This autocomplete is for use in the search within time entry box.\n      var timeAutocomplete = new google.maps.places.Autocomplete(\n          document.getElementById('search-within-time-text'));\n      // This autocomplete is for use in the geocoder entry box.\n      var zoomAutocomplete = new google.maps.places.Autocomplete(\n          document.getElementById('zoom-to-area-text'));\n      // Bias the boundaries within the map for the zoom to area text.\n      zoomAutocomplete.bindTo('bounds', map);\n      // Create a searchbox in order to execute a places search\n      var searchBox = new google.maps.places.SearchBox(\n          document.getElementById('places-search'));\n      // Bias the searchbox to within the bounds of the map.\n      searchBox.setBounds(map.getBounds());\n\n      // These are the real estate listings that will be shown to the user.\n      // Normally we'd have these in a database instead.\n      var locations = [\n        {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},\n        {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},\n        {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},\n        {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},\n        {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},\n        {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}\n      ];\n\n      var largeInfowindow = new google.maps.InfoWindow();\n\n      // Initialize the drawing manager.\n      var drawingManager = new google.maps.drawing.DrawingManager({\n        drawingMode: google.maps.drawing.OverlayType.POLYGON,\n        drawingControl: true,\n        drawingControlOptions: {\n          position: google.maps.ControlPosition.TOP_LEFT,\n          drawingModes: [\n            google.maps.drawing.OverlayType.POLYGON\n          ]\n        }\n      });\n\n      // Style the markers a bit. This will be our listing marker icon.\n      var defaultIcon = makeMarkerIcon('0091ff');\n\n      // Create a \"highlighted location\" marker color for when the user\n      // mouses over the marker.\n      var highlightedIcon = makeMarkerIcon('FFFF24');\n\n      // The following group uses the location array to create an array of markers on initialize.\n      for (var i = 0; i < locations.length; i++) {\n        // Get the position from the location array.\n        var position = locations[i].location;\n        var title = locations[i].title;\n        // Create a marker per location, and put into markers array.\n        var marker = new google.maps.Marker({\n          position: position,\n          title: title,\n          animation: google.maps.Animation.DROP,\n          icon: defaultIcon,\n          id: i\n        });\n        // Push the marker to our array of markers.\n        markers.push(marker);\n        // Create an onclick event to open the large infowindow at each marker.\n        marker.addListener('click', function() {\n          populateInfoWindow(this, largeInfowindow);\n        });\n        // Two event listeners - one for mouseover, one for mouseout,\n        // to change the colors back and forth.\n        marker.addListener('mouseover', function() {\n          this.setIcon(highlightedIcon);\n        });\n        marker.addListener('mouseout', function() {\n          this.setIcon(defaultIcon);\n        });\n      }\n      //document.getElementById('show-listings').addEventListener('click', showListings);\n\n      document.getElementById('hide-listings').addEventListener('click', function() {\n        hideMarkers(markers);\n      });\n\n      document.getElementById('toggle-drawing').addEventListener('click', function() {\n        toggleDrawing(drawingManager);\n      });\n\n      document.getElementById('zoom-to-area').addEventListener('click', function() {\n        zoomToArea();\n      });\n\n      document.getElementById('search-within-time').addEventListener('click', function() {\n        searchWithinTime();\n      });\n\n      // Listen for the event fired when the user selects a prediction from the\n      // picklist and retrieve more details for that place.\n      searchBox.addListener('places_changed', function() {\n        searchBoxPlaces(this);\n      });\n\n      // Listen for the event fired when the user selects a prediction and clicks\n      // \"go\" more details for that place.\n      document.getElementById('go-places').addEventListener('click', textSearchPlaces);\n\n      // Add an event listener so that the polygon is captured,  call the\n      // searchWithinPolygon function. This will show the markers in the polygon,\n      // and hide any outside of it.\n      drawingManager.addListener('overlaycomplete', function(event) {\n        // First, check if there is an existing polygon.\n        // If there is, get rid of it and remove the markers\n        if (polygon) {\n          polygon.setMap(null);\n          hideMarkers(markers);\n        }\n        // Switching the drawing mode to the HAND (i.e., no longer drawing).\n        drawingManager.setDrawingMode(null);\n        // Creating a new editable polygon from the overlay.\n        polygon = event.overlay;\n        polygon.setEditable(true);\n        // Searching within the polygon.\n        searchWithinPolygon(polygon);\n        // Make sure the search is re-done if the poly is changed.\n        polygon.getPath().addListener('set_at', searchWithinPolygon);\n        polygon.getPath().addListener('insert_at', searchWithinPolygon);\n      });\n    }\n\n    // This function populates the infowindow when the marker is clicked. We'll only allow\n    // one infowindow which will open at the marker that is clicked, and populate based\n    // on that markers position.\n    function populateInfoWindow(marker, infowindow) {\n      // Check to make sure the infowindow is not already opened on this marker.\n      if (infowindow.marker != marker) {\n        // Clear the infowindow content to give the streetview time to load.\n        infowindow.setContent('');\n        infowindow.marker = marker;\n        // Make sure the marker property is cleared if the infowindow is closed.\n        infowindow.addListener('closeclick', function() {\n          infowindow.marker = null;\n        });\n        var streetViewService = new google.maps.StreetViewService();\n        var radius = 50;\n        // In case the status is OK, which means the pano was found, compute the\n        // position of the streetview image, then calculate the heading, then get a\n        // panorama from that and set the options\n        function getStreetView(data, status) {\n          if (status == google.maps.StreetViewStatus.OK) {\n            var nearStreetViewLocation = data.location.latLng;\n            var heading = google.maps.geometry.spherical.computeHeading(\n              nearStreetViewLocation, marker.position);\n              infowindow.setContent('<div>' + marker.title + '</div><div id=\"pano\"></div>');\n              var panoramaOptions = {\n                position: nearStreetViewLocation,\n                pov: {\n                  heading: heading,\n                  pitch: 30\n                }\n              };\n            var panorama = new google.maps.StreetViewPanorama(\n              document.getElementById('pano'), panoramaOptions);\n          } else {\n            infowindow.setContent('<div>' + marker.title + '</div>' +\n              '<div>No Street View Found</div>');\n          }\n        }\n        // Use streetview service to get the closest streetview image within\n        // 50 meters of the markers position\n        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);\n        // Open the infowindow on the correct marker.\n        infowindow.open(map, marker);\n      }\n    }\n\n    // This function will loop through the markers array and display them all.\n    function showListings() {\n      var bounds = new google.maps.LatLngBounds();\n      // Extend the boundaries of the map for each marker and display the marker\n      for (var i = 0; i < markers.length; i++) {\n        markers[i].setMap(map);\n        bounds.extend(markers[i].position);\n      }\n      map.fitBounds(bounds);\n    }\n\n    // This function will loop through the listings and hide them all.\n    function hideMarkers(markers) {\n      for (var i = 0; i < markers.length; i++) {\n        markers[i].setMap(null);\n      }\n    }\n\n    // This function takes in a COLOR, and then creates a new marker\n    // icon of that color. The icon will be 21 px wide by 34 high, have an origin\n    // of 0, 0 and be anchored at 10, 34).\n    function makeMarkerIcon(markerColor) {\n      var markerImage = new google.maps.MarkerImage(\n        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +\n        '|40|_|%E2%80%A2',\n        new google.maps.Size(21, 34),\n        new google.maps.Point(0, 0),\n        new google.maps.Point(10, 34),\n        new google.maps.Size(21,34));\n      return markerImage;\n    }\n\n    // This shows and hides (respectively) the drawing options.\n    function toggleDrawing(drawingManager) {\n      if (drawingManager.map) {\n        drawingManager.setMap(null);\n        // In case the user drew anything, get rid of the polygon\n        if (polygon !== null) {\n          polygon.setMap(null);\n        }\n      } else {\n        drawingManager.setMap(map);\n      }\n    }\n\n    // This function hides all markers outside the polygon,\n    // and shows only the ones within it. This is so that the\n    // user can specify an exact area of search.\n    function searchWithinPolygon() {\n      for (var i = 0; i < markers.length; i++) {\n        if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {\n          markers[i].setMap(map);\n        } else {\n          markers[i].setMap(null);\n        }\n      }\n    }\n\n    // This function takes the input value in the find nearby area text input\n    // locates it, and then zooms into that area. This is so that the user can\n    // show all listings, then decide to focus on one area of the map.\n    function zoomToArea() {\n      // Initialize the geocoder.\n      var geocoder = new google.maps.Geocoder();\n      // Get the address or place that the user entered.\n      var address = document.getElementById('zoom-to-area-text').value;\n      // Make sure the address isn't blank.\n      if (address == '') {\n        window.alert('You must enter an area, or address.');\n      } else {\n        // Geocode the address/area entered to get the center. Then, center the map\n        // on it and zoom in\n        geocoder.geocode(\n          { address: address,\n            componentRestrictions: {locality: 'New York'}\n          }, function(results, status) {\n            if (status == google.maps.GeocoderStatus.OK) {\n              map.setCenter(results[0].geometry.location);\n              map.setZoom(15);\n            } else {\n              window.alert('We could not find that location - try entering a more' +\n                  ' specific place.');\n            }\n          });\n        }\n      }\n\n    // This function allows the user to input a desired travel time, in\n    // minutes, and a travel mode, and a location - and only show the listings\n    // that are within that travel time (via that travel mode) of the location\n    function searchWithinTime() {\n      // Initialize the distance matrix service.\n      var distanceMatrixService = new google.maps.DistanceMatrixService;\n      var address = document.getElementById('search-within-time-text').value;\n      // Check to make sure the place entered isn't blank.\n      if (address == '') {\n        window.alert('You must enter an address.');\n      } else {\n        hideMarkers(markers);\n        // Use the distance matrix service to calculate the duration of the\n        // routes between all our markers, and the destination address entered\n        // by the user. Then put all the origins into an origin matrix.\n        var origins = [];\n        for (var i = 0; i < markers.length; i++) {\n          origins[i] = markers[i].position;\n        }\n        var destination = address;\n        var mode = document.getElementById('mode').value;\n        // Now that both the origins and destination are defined, get all the\n        // info for the distances between them.\n        distanceMatrixService.getDistanceMatrix({\n          origins: origins,\n          destinations: [destination],\n          travelMode: google.maps.TravelMode[mode],\n          unitSystem: google.maps.UnitSystem.IMPERIAL,\n        }, function(response, status) {\n          if (status !== google.maps.DistanceMatrixStatus.OK) {\n            window.alert('Error was: ' + status);\n          } else {\n            displayMarkersWithinTime(response);\n          }\n        });\n      }\n    }\n\n    // This function will go through each of the results, and,\n    // if the distance is LESS than the value in the picker, show it on the map.\n    function displayMarkersWithinTime(response) {\n      var maxDuration = document.getElementById('max-duration').value;\n      var origins = response.originAddresses;\n      var destinations = response.destinationAddresses;\n      // Parse through the results, and get the distance and duration of each.\n      // Because there might be  multiple origins and destinations we have a nested loop\n      // Then, make sure at least 1 result was found.\n      var atLeastOne = false;\n      for (var i = 0; i < origins.length; i++) {\n        var results = response.rows[i].elements;\n        for (var j = 0; j < results.length; j++) {\n          var element = results[j];\n          if (element.status === \"OK\") {\n            // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch\n            // the function to show markers within a user-entered DISTANCE, we would need the\n            // value for distance, but for now we only need the text.\n            var distanceText = element.distance.text;\n            // Duration value is given in seconds so we make it MINUTES. We need both the value\n            // and the text.\n            var duration = element.duration.value / 60;\n            var durationText = element.duration.text;\n            if (duration <= maxDuration) {\n              //the origin [i] should = the markers[i]\n              markers[i].setMap(map);\n              atLeastOne = true;\n              // Create a mini infowindow to open immediately and contain the\n              // distance and duration\n              var infowindow = new google.maps.InfoWindow({\n                content: durationText + ' away, ' + distanceText +\n                  '<div><input type=\\\"button\\\" value=\\\"View Route\\\" onclick =' +\n                  '\\\"displayDirections(&quot;' + origins[i] + '&quot;);\\\"></input></div>'\n              });\n              infowindow.open(map, markers[i]);\n              // Put this in so that this small window closes if the user clicks\n              // the marker, when the big infowindow opens\n              markers[i].infowindow = infowindow;\n              google.maps.event.addListener(markers[i], 'click', function() {\n                this.infowindow.close();\n              });\n            }\n          }\n        }\n      }\n      if (!atLeastOne) {\n        window.alert('We could not find any locations within that distance!');\n      }\n    }\n\n    // This function is in response to the user selecting \"show route\" on one\n    // of the markers within the calculated distance. This will display the route\n    // on the map.\n    function displayDirections(origin) {\n      hideMarkers(markers);\n      var directionsService = new google.maps.DirectionsService;\n      // Get the destination address from the user entered value.\n      var destinationAddress =\n          document.getElementById('search-within-time-text').value;\n      // Get mode again from the user entered value.\n      var mode = document.getElementById('mode').value;\n      directionsService.route({\n        // The origin is the passed in marker's position.\n        origin: origin,\n        // The destination is user entered address.\n        destination: destinationAddress,\n        travelMode: google.maps.TravelMode[mode]\n      }, function(response, status) {\n        if (status === google.maps.DirectionsStatus.OK) {\n          var directionsDisplay = new google.maps.DirectionsRenderer({\n            map: map,\n            directions: response,\n            draggable: true,\n            polylineOptions: {\n              strokeColor: 'green'\n            }\n          });\n        } else {\n          window.alert('Directions request failed due to ' + status);\n        }\n      });\n    }\n\n    // This function fires when the user selects a searchbox picklist item.\n    // It will do a nearby search using the selected query string or place.\n    function searchBoxPlaces(searchBox) {\n      hideMarkers(placeMarkers);\n      var places = searchBox.getPlaces();\n      if (places.length == 0) {\n        window.alert('We did not find any places matching that search!');\n      } else {\n      // For each place, get the icon, name and location.\n        createMarkersForPlaces(places);\n      }\n    }\n\n    // This function firest when the user select \"go\" on the places search.\n    // It will do a nearby search using the entered query string or place.\n    function textSearchPlaces() {\n      var bounds = map.getBounds();\n      hideMarkers(placeMarkers);\n      var placesService = new google.maps.places.PlacesService(map);\n      placesService.textSearch({\n        query: document.getElementById('places-search').value,\n        bounds: bounds\n      }, function(results, status) {\n        if (status === google.maps.places.PlacesServiceStatus.OK) {\n          createMarkersForPlaces(results);\n        }\n      });\n    }\n\n    // This function creates markers for each place found in either places search.\n    function createMarkersForPlaces(places) {\n      var bounds = new google.maps.LatLngBounds();\n      for (var i = 0; i < places.length; i++) {\n        var place = places[i];\n        var icon = {\n          url: place.icon,\n          size: new google.maps.Size(35, 35),\n          origin: new google.maps.Point(0, 0),\n          anchor: new google.maps.Point(15, 34),\n          scaledSize: new google.maps.Size(25, 25)\n        };\n        // Create a marker for each place.\n        var marker = new google.maps.Marker({\n          map: map,\n          icon: icon,\n          title: place.name,\n          position: place.geometry.location,\n          id: place.place_id\n        });\n        // Create a single infowindow to be used with the place details information\n        // so that only one is open at once.\n        var placeInfoWindow = new google.maps.InfoWindow();\n        // If a marker is clicked, do a place details search on it in the next function.\n        marker.addListener('click', function() {\n          if (placeInfoWindow.marker == this) {\n            console.log(\"This infowindow already is on this marker!\");\n          } else {\n            getPlacesDetails(this, placeInfoWindow);\n          }\n        });\n        placeMarkers.push(marker);\n        if (place.geometry.viewport) {\n          // Only geocodes have viewport.\n          bounds.union(place.geometry.viewport);\n        } else {\n          bounds.extend(place.geometry.location);\n        }\n      }\n      map.fitBounds(bounds);\n    }\n\n  // This is the PLACE DETAILS search - it's the most detailed so it's only\n  // executed when a marker is selected, indicating the user wants more\n  // details about that place.\n  function getPlacesDetails(marker, infowindow) {\n    var service = new google.maps.places.PlacesService(map);\n    service.getDetails({\n      placeId: marker.id\n    }, function(place, status) {\n      if (status === google.maps.places.PlacesServiceStatus.OK) {\n        // Set the marker property on this infowindow so it isn't created again.\n        infowindow.marker = marker;\n        var innerHTML = '<div>';\n        if (place.name) {\n          innerHTML += '<strong>' + place.name + '</strong>';\n        }\n        if (place.formatted_address) {\n          innerHTML += '<br>' + place.formatted_address;\n        }\n        if (place.formatted_phone_number) {\n          innerHTML += '<br>' + place.formatted_phone_number;\n        }\n        if (place.opening_hours) {\n          innerHTML += '<br><br><strong>Hours:</strong><br>' +\n              place.opening_hours.weekday_text[0] + '<br>' +\n              place.opening_hours.weekday_text[1] + '<br>' +\n              place.opening_hours.weekday_text[2] + '<br>' +\n              place.opening_hours.weekday_text[3] + '<br>' +\n              place.opening_hours.weekday_text[4] + '<br>' +\n              place.opening_hours.weekday_text[5] + '<br>' +\n              place.opening_hours.weekday_text[6];\n        }\n        if (place.photos) {\n          innerHTML += '<br><br><img src=\"' + place.photos[0].getUrl(\n              {maxHeight: 100, maxWidth: 200}) + '\">';\n        }\n        innerHTML += '</div>';\n        infowindow.setContent(innerHTML);\n        infowindow.open(map, marker);\n        // Make sure the marker property is cleared if the infowindow is closed.\n        infowindow.addListener('closeclick', function() {\n          infowindow.marker = null;\n        });\n      }\n    });\n  } -->\n\n  <!-- </script> -->\n<script async defer\n      src=\n      \"https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyDbuePk6SWPXXFDZv7Uo4YCClERESdXKiY&v=3&callback=initMap\">\n</script>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__side_panel_side_panel_component__ = __webpack_require__("./src/app/side-panel/side-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_panel_add_panel_component__ = __webpack_require__("./src/app/add-panel/add-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__delete_panel_delete_panel_component__ = __webpack_require__("./src/app/delete-panel/delete-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db_accessor_service__ = __webpack_require__("./src/app/db-accessor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppComponent = /** @class */ (function () {
    function AppComponent(dbAccessor, http) {
        var _this = this;
        this.dbAccessor = dbAccessor;
        this.http = http;
        this.title = 'Tian\'s app';
        // Create a new blank array for all the listing markers.
        this.markers = [];
        // largeInfowindow: any;
        // This global polygon variable is to ensure only ONE polygon is rendered.
        this.polygon = null;
        // Create placemarkers array to use in multiple functions to have control
        // over the number of places that show.
        this.placeMarkers = [];
        // this.crimeRecords =  this.dbAccessor.getAll();
        this.dbAccessor.getAll()
            .subscribe(function (rtn) {
            _this.crimeRecords = rtn;
            _this.LoadMarkers();
            console.log(_this.crimeRecords);
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
    AppComponent.prototype.ngOnInit = function () {
        var styles = this.mapStyle;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.51157, lng: -122.134 },
            zoom: 11,
            styles: this.mapStyle,
            mapTypeControl: false
        });
        // console.log(this.mapStyle);
        // console.log(this.crimeRecords);
        var geocoder = new google.maps.Geocoder();
        // This autocomplete is for use in the geocoder entry box.
        var zoomAutocomplete = new google.maps.places.Autocomplete(document.getElementById('zoom-to-area-text'));
        // Bias the boundaries within the map for the zoom to area text.
        zoomAutocomplete.bindTo('bounds', this.map);
        console.log(this.crimeRecords);
        console.log(this.sidePanel);
        var largeInfowindow = new google.maps.InfoWindow();
        // Initialize the drawing manager.
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            }
        });
    };
    AppComponent.prototype.LoadMap = function () {
        var styles = this.mapStyle;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.51157, lng: -122.134 },
            zoom: 11,
            styles: this.mapStyle,
            mapTypeControl: false
        });
        console.log(this.mapStyle);
        console.log(this.crimeRecords);
        var geocoder = new google.maps.Geocoder();
        // This autocomplete is for use in the geocoder entry box.
        var zoomAutocomplete = new google.maps.places.Autocomplete(document.getElementById('zoom-to-area-text'));
        // Bias the boundaries within the map for the zoom to area text.
        zoomAutocomplete.bindTo('bounds', this.map);
        console.log(this.crimeRecords);
        console.log(this.sidePanel);
        var largeInfowindow = new google.maps.InfoWindow();
        // Initialize the drawing manager.
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            }
        });
    };
    // This function will loop through the markers array and display them all.
    AppComponent.prototype.showListings = function () {
        var bounds = new google.maps.LatLngBounds();
        console.log('this.markers.length:' + this.markers.length + this.markers);
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
            bounds.extend(this.markers[i].position);
        }
        this.map.fitBounds(bounds);
    };
    // This function will loop through the listings and hide them all.
    AppComponent.prototype.hideMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    };
    AppComponent.prototype.checkMarkers = function () {
        console.log('check marker' + this.markers);
    };
    // This function takes the input value in the find nearby area text input
    // locates it, and then zooms into that area. This is so that the user can
    // show all listings, then decide to focus on one area of the map.
    AppComponent.prototype.zoomToArea = function () {
        var _this = this;
        // Initialize the geocoder.
        var geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        // const address = document.getElementById('zoom-to-area-text').value;
        console.log('zoomToArea');
        console.log(this);
        var address = this.sidePanel.zoomPlace;
        // console.log(address);
        // Make sure the address isn't blank.
        if (address === '') {
            window.alert('You must enter an area, or address.');
        }
        else {
            // Geocode the address/area entered to get the center. Then, center the map
            // on it and zoom in
            geocoder.geocode({ address: address,
                componentRestrictions: { locality: 'California' }
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    // const latlng = new google.maps.LatLng(39.51157, -132.134);
                    _this.map.setZoom(13);
                    _this.map.setCenter(results[0].geometry.location);
                }
                else {
                    window.alert('We could not find that location - try entering a more' +
                        ' specific place.');
                }
            });
        }
    };
    AppComponent.prototype.LoadMarkers = function () {
        var _this = this;
        var largeInfowindow = new google.maps.InfoWindow();
        // Style the markers a bit. This will be our listing marker icon.
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = this.makeMarkerIcon('highlighted');
        var _loop_1 = function (i) {
            // Get the position from the location array.
            var position = this_1.crimeRecords[i].location;
            var time = this_1.crimeRecords[i].time;
            var title = this_1.crimeRecords[i].type;
            var defaultIcon = this_1.makeMarkerIcon(title);
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title + '|' + time,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,
                id: i
            });
            // Push the marker to our array of markers.
            this_1.markers.push(marker);
            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function () {
                _this.populateInfoWindow(marker, largeInfowindow);
            });
            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });
        };
        var this_1 = this;
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < this.crimeRecords.length; i++) {
            _loop_1(i);
        }
    };
    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    AppComponent.prototype.makeMarkerIcon = function (crimeType) {
        var markerImage = new google.maps.MarkerImage('../assets/img/' + crimeType + '.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(10, 34), new google.maps.Size(44, 44));
        return markerImage;
    };
    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    AppComponent.prototype.populateInfoWindow = function (marker, infowindow) {
        console.log('CLICK on icon');
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            // Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            var terms = marker.title.split('|');
            var type_1 = terms[0];
            var time_1 = terms[1];
            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, function (data, status) {
                if (status === google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                    // tslint:disable-next-line:max-line-length
                    infowindow.setContent('<div style="width:400px; height:400px">' + '<div style="font-weight: bold">' + type_1 + '</div><div style="font-weight: bold">' + 'Time: ' + time_1 + '</div><div style="width:400px; height:360px" id="pano">zzz</div></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
                    console.log(panorama);
                }
                else {
                    // tslint:disable-next-line:max-line-length
                    infowindow.setContent('<div style="font-weight: bold">' + type_1 + '</div><div style="font-weight: bold">' + 'Time: ' + time_1 + '</div>' +
                        '<div>No Street View Found</div>');
                }
            });
            // Open the infowindow on the correct marker.
            infowindow.open(this.map, marker);
        }
    };
    AppComponent.prototype.addSearch = function (tag) {
        // This autocomplete is for use in the geocoder entry box.
        var addAutocomplete = new google.maps.places.Autocomplete(document.getElementById(tag));
        // Bias the boundaries within the map for the zoom to area text.
        addAutocomplete.bindTo('bounds', this.map);
    };
    AppComponent.prototype.getMapStyle = function () {
        // get users from api
        return this.http.get('../assets/img/mapStyle.json')
            .map(function (res) { return res.json(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__side_panel_side_panel_component__["a" /* SidePanelComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__side_panel_side_panel_component__["a" /* SidePanelComponent */])
    ], AppComponent.prototype, "sidePanel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__add_panel_add_panel_component__["a" /* AddPanelComponent */]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__delete_panel_delete_panel_component__["a" /* DeletePanelComponent */])
        // private sidePanel: SidePanelComponent;
        ,
        __metadata("design:type", google.maps.Map)
    ], AppComponent.prototype, "map", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__db_accessor_service__["a" /* DbAccessorService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__db_accessor_service__["a" /* DbAccessorService */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_panel_add_panel_component__ = __webpack_require__("./src/app/add-panel/add-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__delete_panel_delete_panel_component__ = __webpack_require__("./src/app/delete-panel/delete-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__side_panel_side_panel_component__ = __webpack_require__("./src/app/side-panel/side-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__db_accessor_service__ = __webpack_require__("./src/app/db-accessor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__map_map_component__ = __webpack_require__("./src/app/map/map.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__add_panel_add_panel_component__["a" /* AddPanelComponent */],
                __WEBPACK_IMPORTED_MODULE_6__delete_panel_delete_panel_component__["a" /* DeletePanelComponent */],
                __WEBPACK_IMPORTED_MODULE_7__side_panel_side_panel_component__["a" /* SidePanelComponent */],
                __WEBPACK_IMPORTED_MODULE_9__map_map_component__["a" /* MapComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_8__db_accessor_service__["a" /* DbAccessorService */]],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/db-accessor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbAccessorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


 // for observable
var DbAccessorService = /** @class */ (function () {
    function DbAccessorService(http) {
        this.http = http;
        console.log('running DB service...');
    }
    DbAccessorService.prototype.getAll = function () {
        return this.http.get('http://localhost:3000/showAll')
            .map(function (res) { return res.json(); });
    };
    DbAccessorService.prototype.addOne = function (newRecord) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/add', JSON.stringify(newRecord), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbAccessorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], DbAccessorService);
    return DbAccessorService;
}());



/***/ }),

/***/ "./src/app/delete-panel/delete-panel.component.css":
/***/ (function(module, exports) {

module.exports = ".custom{\n    width: 45%;\n    margin-left: 10px;\n}\n\n.right{\n    float: right;\n    margin-right: 5px;\n    margin-bottom: 5px;\n}\n\n#deletePanel {\n    margin-bottom: 10px;\n}"

/***/ }),

/***/ "./src/app/delete-panel/delete-panel.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div>\n    <button type=\"button\" class=\"btn btn-danger btn-block\" (click)=\"onClick()\">Delete a report here</button>\n</div>\n<div [ngClass]=\"{'d-none':this.isClick === false}\" id=\"deletePanel\">\n    <br/>\n    <span class=\"text\">Select an icon or enter a location:</span><br/>\n    <input id=\"delete-address\" type=\"text\" placeholder=\"Ex: 5604 Melodia Cir, Dublin, CA\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\"><br/>\n    <button type=\"button\" class=\"btn btn-danger right\">Delete</button>\n</div>"

/***/ }),

/***/ "./src/app/delete-panel/delete-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeletePanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DeletePanelComponent = /** @class */ (function () {
    function DeletePanelComponent() {
        this.isClick = false;
    }
    DeletePanelComponent.prototype.ngOnInit = function () {
    };
    DeletePanelComponent.prototype.onClick = function () {
        this.isClick = !this.isClick;
    };
    DeletePanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-delete-panel',
            template: __webpack_require__("./src/app/delete-panel/delete-panel.component.html"),
            styles: [__webpack_require__("./src/app/delete-panel/delete-panel.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DeletePanelComponent);
    return DeletePanelComponent;
}());



/***/ }),

/***/ "./src/app/map/map.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/map/map.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"googleMap\"></div>\n"

/***/ }),

/***/ "./src/app/map/map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MapComponent = /** @class */ (function () {
    function MapComponent() {
    }
    MapComponent.prototype.ngOnInit = function () {
        var styles = [
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
        // Constructor creates a new map - only center and zoom are required.
        // const map = new google.maps.Map(document.getElementById('googleMap'), {
        //   center: {lat: 37.51157, lng: -122.134},
        //   zoom: 11,
        //   styles: styles,
        //   mapTypeControl: false
        // });
    };
    MapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-map',
            template: __webpack_require__("./src/app/map/map.component.html"),
            styles: [__webpack_require__("./src/app/map/map.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MapComponent);
    return MapComponent;
}());



/***/ }),

/***/ "./src/app/side-panel/side-panel.component.css":
/***/ (function(module, exports) {

module.exports = "\n@import \"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700\";\n/*\n    DEMO STYLE\n*/\nbody {\n    font-family: 'Poppins', sans-serif;\n    background: #fafafa;\n}\np {\n    font-family: 'Poppins', sans-serif;\n    font-size: 1.1em;\n    font-weight: 300;\n    line-height: 1.7em;\n    color: #999;\n}\na, a:hover, a:focus {\n    color: inherit;\n    text-decoration: none;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n}\n.navbar {\n    padding: 15px 10px;\n    background: #fff;\n    border: none;\n    border-radius: 0;\n    margin-bottom: 40px;\n    -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n}\n.navbar-btn {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    outline: none !important;\n    border: none;\n}\n.line {\n    width: 100%;\n    height: 1px;\n    border-bottom: 1px dashed #ddd;\n    margin: 40px 0;\n}\n/* ---------------------------------------------------\n    SIDEBAR STYLE\n----------------------------------------------------- */\n.wrapper2 {\n    left: 0px;\n    width:20%;\n    bottom:0px;\n    height: 100%;\n    position: absolute;\n    background: #353531;\n    color: #fff;\n    /* display: flex; */\n    /* align-items: stretch; */\n    /* perspective: 1500px; */\n}\n#sidebar {\n    min-width: 250px;\n    max-width: 250px;\n    background: #353531;\n    color: #fff;\n    -webkit-transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);\n    transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);\n    -webkit-transform-origin: bottom left;\n            transform-origin: bottom left;\n}\n#sidebar.active {\n    margin-left: -250px;\n    -webkit-transform: rotateY(100deg);\n            transform: rotateY(100deg);\n}\n#sidebar .sidebar-header {\n    padding: 20px;\n    background: #353531;\n}\n#sidebar ul.components {\n    padding: 20px 0;\n    border-bottom: 1px solid #47748b;\n}\n#sidebar ul p {\n    color: #fff;\n    padding: 10px;\n}\n#sidebar ul li a {\n    padding: 10px;\n    font-size: 1.1em;\n    display: block;\n}\n#sidebar ul li a:hover {\n    color: #353531;\n    background: #fff;\n}\n#sidebar ul li.active > a, a[aria-expanded=\"true\"] {\n    color: #fff;\n    background: #353531;\n}\na[data-toggle=\"collapse\"] {\n    position: relative;\n}\na[aria-expanded=\"false\"]::before, a[aria-expanded=\"true\"]::before {\n    content: '\\e259';\n    display: block;\n    position: absolute;\n    right: 20px;\n    font-family: 'Glyphicons Halflings';\n    font-size: 0.6em;\n}\na[aria-expanded=\"true\"]::before {\n    content: '\\e260';\n}\nul ul a {\n    font-size: 0.9em !important;\n    padding-left: 30px !important;\n    background: #353531;\n}\nul.CTAs {\n    padding: 20px;\n}\nul.CTAs a {\n    text-align: center;\n    font-size: 0.9em !important;\n    display: block;\n    border-radius: 5px;\n    margin-bottom: 5px;\n}\na.download {\n    background: #fff;\n    color: #353531;\n}\na.article, a.article:hover {\n    background: #353531 !important;\n    color: #fff !important;\n}\n/* ---------------------------------------------------\n    CONTENT STYLE\n----------------------------------------------------- */\n#content {\n    padding: 20px;\n    min-height: 100vh;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n}\n#sidebarCollapse {\n    width: 40px;\n    height: 40px;\n    background: #f5f5f5;\n}\n#sidebarCollapse span {\n    width: 80%;\n    height: 2px;\n    margin: 0 auto;\n    display: block;\n    background: #555;\n    -webkit-transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);\n    transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);\n    -webkit-transition-delay: 0.2s;\n            transition-delay: 0.2s;\n}\n#sidebarCollapse span:first-of-type {\n    -webkit-transform: rotate(45deg) translate(2px, 2px);\n            transform: rotate(45deg) translate(2px, 2px);\n}\n#sidebarCollapse span:nth-of-type(2) {\n    opacity: 0;\n}\n#sidebarCollapse span:last-of-type {\n    -webkit-transform: rotate(-45deg) translate(1px, -1px);\n            transform: rotate(-45deg) translate(1px, -1px);\n}\n#sidebarCollapse.active span {\n    -webkit-transform: none;\n            transform: none;\n    opacity: 1;\n    margin: 5px auto;\n}\n/* ---------------------------------------------------\n    MEDIAQUERIES\n----------------------------------------------------- */\n@media (max-width: 768px) {\n    #sidebar {\n        margin-left: -250px;\n        -webkit-transform: rotateY(90deg);\n                transform: rotateY(90deg);\n    }\n    #sidebar.active {\n        margin-left: 0;\n        -webkit-transform: none;\n                transform: none;\n    }\n    #sidebarCollapse span:first-of-type,\n    #sidebarCollapse span:nth-of-type(2),\n    #sidebarCollapse span:last-of-type {\n        -webkit-transform: none;\n                transform: none;\n        opacity: 1;\n        margin: 5px auto;\n    }\n    #sidebarCollapse.active span {\n        margin: 0 auto;\n    }\n    #sidebarCollapse.active span:first-of-type {\n        -webkit-transform: rotate(45deg) translate(2px, 2px);\n                transform: rotate(45deg) translate(2px, 2px);\n    }\n    #sidebarCollapse.active span:nth-of-type(2) {\n        opacity: 0;\n    }\n    #sidebarCollapse.active span:last-of-type {\n        -webkit-transform: rotate(-45deg) translate(1px, -1px);\n                transform: rotate(-45deg) translate(1px, -1px);\n    }\n}\n.btn-ct {\n    border-radius: 5px;\n    width: 35%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n}\n#show-listings {\n    left:10%;\n}\n#hide-listings {\n    right:10%;\n}\n.divider1{\n    width:12%;\n    height:auto;\n    display:inline-block;\n}\n.divider2{\n    width:8%;\n    height:auto;\n    display:inline-block;\n}\n#zoom-to-area-text {\n    margin-left: 10px;\n    width: 95%;\n    display:inline-block;\n}\n#zoom-to-area{\n    width: 40%;\n    margin-right: 30%;\n    margin-top: 10px;\n    margin-bottom: 20px;\n    float: right;\n}\n#toggle-drawing{\n    width: 40%;\n    margin-right: 30%;\n    margin-top: 10px;\n    margin-bottom: 20px;\n    float: right;\n}\n#draw {\n    margin-left: 5%;\n    margin-top: 10px;\n    text-align: center;\n}\nhr{\n    border-color: white;\n}\n"

/***/ }),

/***/ "./src/app/side-panel/side-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper2\">\n        <!-- Sidebar Header -->\n        <div class=\"sidebar-header2\">\n            <br/>\n            <h4 align=\"center\">Let's Build a Safer Community</h4>\n            <!-- <h6>\n                Welcome to Tian's App!\n            </h6> -->\n        </div>\n        <br/>\n        <div>\n          <div class=\"divider2\"></div>\n          <input class=\"btn-warning btn-ct\" id=\"show-listings\" type=\"button\" value=\"Show Listings\" (click)=\"onClickShow()\">\n          <div class=\"divider2\"></div>\n          <input class=\"btn-warning btn-ct\" id=\"hide-listings\" type=\"button\" value=\"Hide Listings\" (click)=\"onClickHide()\">\n          <div class=\"divider1\"></div>\n        </div>\n        <div>\n          <input [(ngModel)]=\"zoomPlace\" id=\"zoom-to-area-text\" type=\"text\" placeholder=\"Enter the area you want to check.\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\">\n          <input class=\"btn btn-default btn-ct\" id=\"zoom-to-area\" type=\"button\" value=\"Zoom\" (click)=\"onClickZoom()\">\n        </div>\n        <app-add-panel [mapRef]='this.mapRef' [markers]='this.markers' [records]='this.records'></app-add-panel>\n        <br/>\n        <app-delete-panel></app-delete-panel>\n        <br/>\n        <hr>\n        <div id=\"draw\">\n            <span id=\"draw\">Draw a shape to search within it for the crime records</span><br/>\n            <input class=\"btn btn-default\" id=\"toggle-drawing\"  type=\"button\" value=\"Drawing Tools\">\n        </div>     \n        <br/>\n        <br/>\n        <hr>\n        <div>\n          <span class=\"text\"> Within </span>\n          <select id=\"max-duration\" class=\"custom-select\">\n            <option value=\"10\">10 min</option>\n            <option value=\"15\">15 min</option>\n            <option value=\"30\">30 min</option>\n            <option value=\"60\">1 hour</option>\n          </select>\n          <select id=\"mode\" class=\"custom-select\">\n            <option value=\"DRIVING\">drive</option>\n            <option value=\"WALKING\">walk</option>\n            <option value=\"BICYCLING\">bike</option>\n            <option value=\"TRANSIT\">transit ride</option>\n          </select>\n          <span class=\"text\">of</span>\n          <br/>\n          <input id=\"search-within-time-text\" type=\"text\" placeholder=\"Ex: UC Berkeley, Berkeley, CA\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\">\n          <input class=\"btn btn-default btn-ct\" id=\"search-within-time\" type=\"button\" value=\"Go\">\n        </div>\n        <hr>\n        <div>\n          <span class=\"text\">Search for nearby places</span>\n          <input id=\"places-search\" type=\"text\" placeholder=\"Ex: Pizza delivery in UCB\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\">          \n          <input class=\"btn btn-default btn-ct\" id=\"go-places\" type=\"button\" value=\"Go\">\n        </div>\n\n</div>"

/***/ }),

/***/ "./src/app/side-panel/side-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidePanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidePanelComponent = /** @class */ (function () {
    function SidePanelComponent() {
        this.shown = true;
    }
    SidePanelComponent.prototype.ngOnInit = function () {
    };
    SidePanelComponent.prototype.onClick = function () {
        this.shown = !this.shown;
    };
    SidePanelComponent.prototype.onClickShow = function () {
        console.log('haha' + this.markers);
        this.mapRef.showListings();
    };
    SidePanelComponent.prototype.onClickHide = function () {
        console.log('haha' + this.markers);
        this.mapRef.hideMarkers();
    };
    SidePanelComponent.prototype.onClickZoom = function () {
        this.mapRef.zoomToArea();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "markers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "mapRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "records", void 0);
    SidePanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-side-panel',
            template: __webpack_require__("./src/app/side-panel/side-panel.component.html"),
            styles: [__webpack_require__("./src/app/side-panel/side-panel.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SidePanelComponent);
    return SidePanelComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map