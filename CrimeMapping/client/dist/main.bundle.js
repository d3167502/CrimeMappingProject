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
    function AddPanelComponent(dbAccessor, zone) {
        this.dbAccessor = dbAccessor;
        this.zone = zone;
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
        var lat;
        var lng;
        console.log('Adding one');
        console.log(this.markers);
        this.mapRef.geocoder.geocode({ address: this.addAddress,
            componentRestrictions: { locality: 'California' }
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log(results);
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                console.log(lat);
                var newRecord = {
                    location: { lat: lat, lng: lng },
                    address: _this.addAddress,
                    time: time,
                    type: type
                };
                console.log(newRecord);
                _this.dbAccessor.addOne(newRecord).subscribe(function (record) { return _this.zone.run(function () {
                    _this.mapRef.crimeRecords.push(record);
                    console.log('after reload records..');
                    console.log(_this.mapRef.crimeRecords);
                    // this.mapRef.hideMarkers();
                    // ===========
                    var largeInfowindow = new google.maps.InfoWindow();
                    var position = record.location;
                    var _time = record.time;
                    var title = record.type;
                    var _id = record._id;
                    var defaultIcon = _this.mapRef.makeMarkerIcon(title);
                    var highlightedIcon = _this.mapRef.makeMarkerIcon('highlighted');
                    // Create a marker per location, and put into markers array.
                    var marker = new google.maps.Marker({
                        position: position,
                        title: title + '|' + _time,
                        animation: google.maps.Animation.DROP,
                        icon: defaultIcon
                    });
                    marker.set('id', _id);
                    // Push the marker to our array of markers.
                    _this.mapRef.markers.push(marker);
                    // Create an onclick event to open the large infowindow at each marker.
                    marker.addListener('click', function () {
                        _this.mapRef.populateInfoWindow(marker, largeInfowindow);
                    });
                    // Two event listeners - one for mouseover, one for mouseout,
                    // to change the colors back and forth.
                    marker.addListener('mouseover', function () {
                        this.mapRef.setIcon(this.mapRef.highlightedIcon);
                    });
                    marker.addListener('mouseout', function () {
                        this.mapRef.setIcon(defaultIcon);
                    });
                    // ===========
                    // this.mapRef.LoadMarkers();
                    console.log('after reload markers..');
                    console.log(_this.mapRef.markers);
                    _this.mapRef.markers[_this.mapRef.markers.length - 1].setMap(_this.mapRef.map);
                }); });
                // Push the marker to our array of markers.
                // this.markers.push(marker);
            }
            else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
            }
        });
        this.mapRef.currentMarker.setMap(null);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__db_accessor_service__["a" /* DbAccessorService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]])
    ], AddPanelComponent);
    return AddPanelComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "#map {\n    bottom:0px;\n    height: 100%;\n    left: 20%;\n    position: absolute;\n    width: 80%;\n  }\n\n#pano {\n    width: 1000; \n    height: 1000;\n}\n\n/* .container1 {\n    position: fixed;\n    height: 100%;\n} */"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"container1\">\n    <app-side-panel [getAddress]='this.selectedAddress' [mapRef]='this' [markers]='this.markers' [records]='this.crimeRecords'></app-side-panel>\n    <app-map id=\"map\"></app-map>\n</div>\n\n<!-- <script async defer\n      src=\n      \"https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyDbuePk6SWPXXFDZv7Uo4YCClERESdXKiY&v=3&callback=initMap\">\n</script> -->\n\n"

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
    function AppComponent(dbAccessor, http, zone) {
        var _this = this;
        this.dbAccessor = dbAccessor;
        this.http = http;
        this.zone = zone;
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
        var _this = this;
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
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.51157, lng: -122.134 },
            zoom: 11,
            styles: styles,
            mapTypeControl: false
        });
        this.map.addListener('click', function (e) {
            _this.placeMarker(e.latLng, _this.map);
        });
        // console.log(this.mapStyle);
        // console.log(this.crimeRecords);
        this.geocoder = new google.maps.Geocoder();
        // This autocomplete is for use in the search within time entry box.
        var timeAutocomplete = new google.maps.places.Autocomplete(document.getElementById('search-within-time-text'));
        // This autocomplete is for use in the geocoder entry box.
        var zoomAutocomplete = new google.maps.places.Autocomplete(document.getElementById('zoom-to-area-text'));
        // Bias the boundaries within the map for the zoom to area text.
        zoomAutocomplete.bindTo('bounds', this.map);
        console.log(this.crimeRecords);
        console.log(this.sidePanel);
        var largeInfowindow = new google.maps.InfoWindow();
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
        this.drawingManager.addListener('overlaycomplete', function (event) {
            // First, check if there is an existing polygon.
            // If there is, get rid of it and remove the markers
            if (_this.polygon) {
                _this.polygon.setMap(null);
                _this.hideMarkers(_this.markers);
            }
            // Switching the drawing mode to the HAND (i.e., no longer drawing).
            _this.drawingManager.setDrawingMode(null);
            // Creating a new editable polygon from the overlay.
            _this.polygon = event.overlay;
            _this.polygon.setEditable(true);
            // Searching within the polygon.
            _this.searchWithinPolygon();
            // Make sure the search is re-done if the poly is changed.
            _this.polygon.getPath().addListener('set_at', _this.searchWithinPolygon);
            _this.polygon.getPath().addListener('insert_at', _this.searchWithinPolygon);
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
        // This autocomplete is for use in the search within time entry box.
        var timeAutocomplete = new google.maps.places.Autocomplete(document.getElementById('search-within-time-text'));
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
        console.log('this.markers.length:' + this.markers.length);
        console.log(this.markers);
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
            bounds.extend(this.markers[i].position);
        }
        this.map.fitBounds(bounds);
    };
    // This function will loop through the listings and hide them all.
    AppComponent.prototype.hideMarkers = function (markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    };
    AppComponent.prototype.checkMarkers = function () {
        console.log('check marker' + this.markers);
    };
    // This function takes the input value in the find nearby area text input
    // locates it, and then zooms into that area. This is so that the user can
    // show all listings, then decide to focus on one area of the map.
    AppComponent.prototype.zoomToArea = function () {
        // Initialize the geocoder.
        // const geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        var _this = this;
        // const a = document.getElementById('zoom-to-area-text');
        console.log('zoomToArea');
        console.log(this);
        var address = this.sidePanel.zoomPlace;
        console.log(address);
        // Make sure the address isn't blank.
        if (address === '') {
            window.alert('You must enter an area, or address.');
        }
        else {
            // Geocode the address/area entered to get the center. Then, center the map
            // on it and zoom in
            this.geocoder.geocode({ address: address,
                componentRestrictions: { locality: 'California' }
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    console.log(results[0].geometry.location.lat());
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
        this.markers = [];
        var largeInfowindow = new google.maps.InfoWindow();
        // Style the markers a bit. This will be our listing marker icon.
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = this.makeMarkerIcon('highlighted');
        // The following group uses the location array to create an array of markers on initialize.
        console.log(this.crimeRecords.length);
        var _loop_1 = function (i) {
            // Get the position from the location array.
            var position = this_1.crimeRecords[i].location;
            var time = this_1.crimeRecords[i].time;
            var title = this_1.crimeRecords[i].type;
            var _id = this_1.crimeRecords[i]._id;
            var defaultIcon = this_1.makeMarkerIcon(title);
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title + '|' + time,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,
                id: _id
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
        var _this = this;
        console.log('CLICK on existing icon');
        this.selectedExistingMarker = marker;
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
                _this.zone.run(function () {
                    if (status === google.maps.StreetViewStatus.OK) {
                        console.log('Showing info window');
                        console.log('data');
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
                        if (_this.currentMarker != null) {
                            _this.currentMarker.setMap(null);
                        }
                        _this.sidePanel.addPanel.addAddress = data.location.description;
                        _this.sidePanel.deletePanel.deleteAddress = data.location.description;
                    }
                    else {
                        // tslint:disable-next-line:max-line-length
                        infowindow.setContent('<div style="font-weight: bold">' + type_1 + '</div><div style="font-weight: bold">' + 'Time: ' + time_1 + '</div>' +
                            '<div>No Street View Found</div>');
                        _this.sidePanel.addPanel.addAddress = '';
                        _this.sidePanel.deletePanel.deleteAddress = '';
                    }
                });
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
    AppComponent.prototype.placeMarker = function (position, map) {
        var _this = this;
        if (this.currentMarker != null) {
            this.currentMarker.setMap(null);
        }
        var defaultIcon = this.makeMarkerIcon('highlighted');
        console.log(position);
        var lat = position.lat();
        var lng = position.lng();
        var latlng = { lat: lat, lng: lng };
        this.geocoder.geocode({ 'location': latlng }, function (results, status) {
            _this.zone.run(function () {
                console.log(results[0].formatted_address);
                _this.sidePanel.addPanel.addAddress = results[0].formatted_address;
                _this.sidePanel.deletePanel.deleteAddress = results[0].formatted_address;
                _this.sidePanel.zoomPlace = results[0].formatted_address;
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
    };
    // This shows and hides (respectively) the drawing options.
    AppComponent.prototype.toggleDrawing = function (drawingManager) {
        if (drawingManager.map) {
            drawingManager.setMap(null);
            // In case the user drew anything, get rid of the polygon
            if (this.polygon !== null) {
                this.polygon.setMap(null);
            }
        }
        else {
            drawingManager.setMap(this.map);
        }
    };
    // This function hides all markers outside the polygon,
    // and shows only the ones within it. This is so that the
    // user can specify an exact area of search.
    AppComponent.prototype.searchWithinPolygon = function () {
        for (var i = 0; i < this.markers.length; i++) {
            if (google.maps.geometry.poly.containsLocation(this.markers[i].position, this.polygon)) {
                this.markers[i].setMap(this.map);
            }
            else {
                this.markers[i].setMap(null);
            }
        }
    };
    // This function allows the user to input a desired travel time, in
    // minutes, and a travel mode, and a location - and only show the listings
    // that are within that travel time (via that travel mode) of the location
    AppComponent.prototype.searchWithinTime = function () {
        var _this = this;
        // Initialize the distance matrix service.
        var distanceMatrixService = new google.maps.DistanceMatrixService;
        var address = this.sidePanel.searchTimeAddress;
        // Check to make sure the place entered isn't blank.
        if (address === '') {
            window.alert('You must enter an address.');
        }
        else {
            this.hideMarkers(this.markers);
            // Use the distance matrix service to calculate the duration of the
            // routes between all our markers, and the destination address entered
            // by the user. Then put all the origins into an origin matrix.
            var origins = [];
            for (var i = 0; i < this.markers.length; i++) {
                origins[i] = this.markers[i].position;
            }
            var destination = address;
            var mode = this.sidePanel.travelMode;
            // Now that both the origins and destination are defined, get all the
            // info for the distances between them.
            distanceMatrixService.getDistanceMatrix({
                origins: origins,
                destinations: [destination],
                travelMode: google.maps.TravelMode[mode],
                unitSystem: google.maps.UnitSystem.IMPERIAL,
            }, function (response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    window.alert('Error was: ' + status);
                }
                else {
                    _this.displayMarkersWithinTime(response);
                }
            });
        }
    };
    // This function will go through each of the results, and,
    // if the distance is LESS than the value in the picker, show it on the map.
    AppComponent.prototype.displayMarkersWithinTime = function (response) {
        var _this = this;
        var maxDuration = this.sidePanel.maxDuration;
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        // Parse through the results, and get the distance and duration of each.
        // Because there might be  multiple origins and destinations we have a nested loop
        // Then, make sure at least 1 result was found.
        var atLeastOne = false;
        var _loop_2 = function (i) {
            var results = response.rows[i].elements;
            var _loop_3 = function (j) {
                var element = results[j];
                if (element.status === 'OK') {
                    // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch
                    // the function to show markers within a user-entered DISTANCE, we would need the
                    // value for distance, but for now we only need the text.
                    var distanceText = element.distance.text;
                    // Duration value is given in seconds so we make it MINUTES. We need both the value
                    // and the text.
                    var duration = element.duration.value / 60;
                    var durationText = element.duration.text;
                    if (duration <= maxDuration) {
                        // the origin [i] should = the markers[i]
                        this_2.markers[i].setMap(this_2.map);
                        atLeastOne = true;
                        // Create a mini infowindow to open immediately and contain the
                        // distance and duration
                        var infowindow_1 = new google.maps.InfoWindow();
                        infowindow_1.addListener('click', function () {
                            console.log('yeah');
                        });
                        var infoContent = durationText + ' away, ' + distanceText +
                            '<div><input id=\"eee' + i + '\" type=\"button\" value=\"View Route\"></input></div>';
                        infowindow_1.setContent(infoContent);
                        infowindow_1.open(this_2.map, this_2.markers[i]);
                        // this.displayDirections(origins[i]);
                        // Put this in so that this small window closes if the user clicks
                        // the marker, when the big infowindow opens
                        this_2.markers[i].infowindow = infowindow_1;
                        google.maps.event.addListener(infowindow_1, 'domready', function () {
                            // now my elements are ready for dom manipulation
                            var clickableItem = document.getElementById('eee' + i + '');
                            clickableItem.addEventListener('click', function () {
                                _this.displayDirections(origins[i]);
                            });
                        });
                        google.maps.event.addListener(this_2.markers[i], 'click', function () {
                            infowindow_1.close();
                        });
                        // return ;
                    }
                }
            };
            for (var j = 0; j < results.length; j++) {
                _loop_3(j);
            }
        };
        var this_2 = this;
        for (var i = 0; i < origins.length; i++) {
            _loop_2(i);
        }
        if (!atLeastOne) {
            window.alert('We could not find any locations within that distance!');
        }
    };
    AppComponent.prototype.test2 = function () {
        console.log('Just a test..');
    };
    // This function is in response to the user selecting "show route" on one
    // of the markers within the calculated distance. This will display the route
    // on the map.
    AppComponent.prototype.displayDirections = function (origin) {
        var _this = this;
        console.log('showing direction');
        this.hideMarkers(this.markers);
        var directionsService = new google.maps.DirectionsService;
        // Get the destination address from the user entered value.
        var destinationAddress = this.sidePanel.searchTimeAddress;
        // Get mode again from the user entered value.
        var mode = this.sidePanel.travelMode;
        directionsService.route({
            // The origin is the passed in marker's position.
            origin: origin,
            // The destination is user entered address.
            destination: destinationAddress,
            travelMode: google.maps.TravelMode[mode]
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                var directionsDisplay = new google.maps.DirectionsRenderer({
                    map: _this.map,
                    directions: response,
                    draggable: true,
                    polylineOptions: {
                        strokeColor: 'green'
                    }
                });
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__side_panel_side_panel_component__["a" /* SidePanelComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__side_panel_side_panel_component__["a" /* SidePanelComponent */])
    ], AppComponent.prototype, "sidePanel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__add_panel_add_panel_component__["a" /* AddPanelComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__add_panel_add_panel_component__["a" /* AddPanelComponent */])
    ], AppComponent.prototype, "addPanel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__delete_panel_delete_panel_component__["a" /* DeletePanelComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__delete_panel_delete_panel_component__["a" /* DeletePanelComponent */])
    ], AppComponent.prototype, "deletePanel", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__db_accessor_service__["a" /* DbAccessorService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__db_accessor_service__["a" /* DbAccessorService */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]])
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
    DbAccessorService.prototype.deleteOne = function (id) {
        return this.http.delete('/delete/' + id)
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

module.exports = "\n<div>\n    <button type=\"button\" class=\"btn btn-danger btn-block\" (click)=\"onClick()\">Delete a report here</button>\n</div>\n<div [ngClass]=\"{'d-none':this.isClick === false}\" id=\"deletePanel\">\n    <br/>\n    <form (submit)='deleteRecord()'>\n        <span class=\"text\">Select an icon or enter a location:</span><br/>\n        <input [(ngModel)]=\"deleteAddress\" name=\"delete_address\" id=\"delete-address\" type=\"text\" placeholder=\"Ex: 5604 Melodia Cir, Dublin, CA\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\"><br/>\n        <button type=\"submit\" class=\"btn btn-danger right\">Delete</button>\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/delete-panel/delete-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeletePanelComponent; });
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


var DeletePanelComponent = /** @class */ (function () {
    function DeletePanelComponent(dbAccessor, zone) {
        this.dbAccessor = dbAccessor;
        this.zone = zone;
        this.isClick = false;
    }
    DeletePanelComponent.prototype.ngOnInit = function () {
    };
    DeletePanelComponent.prototype.onClick = function () {
        this.isClick = !this.isClick;
        console.log('Clicked Delete');
    };
    DeletePanelComponent.prototype.deleteRecord = function () {
        var _this = this;
        var id = this.mapRef.selectedExistingMarker.id;
        console.log(this.mapRef.selectedExistingMarker);
        this.dbAccessor.deleteOne(id).subscribe(function (res) { return _this.zone.run(function () {
            console.log(' Delete response');
            console.log(res);
            var rec = _this.mapRef.crimeRecords;
            console.log('records & mks');
            console.log(rec);
            // tslint:disable-next-line:triple-equals
            if (res.n == 1) {
                for (var i = 0; i < rec.length; i++) {
                    // tslint:disable-next-line:triple-equals
                    if (rec[i]._id == id) {
                        _this.mapRef.crimeRecords.splice(i, 1);
                    }
                }
                for (var i = 0; i < _this.mapRef.markers.length; i++) {
                    // tslint:disable-next-line:triple-equals
                    if (_this.mapRef.markers[i].id == id) {
                        console.log('hehe');
                        _this.mapRef.markers[i].setMap(null);
                        _this.mapRef.markers[0].setMap(null);
                    }
                }
                // this.mapRef.LoadMarkers();
            }
            console.log('Double check records & mks');
            console.log(rec);
            console.log(_this.mapRef.markers);
        }); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], DeletePanelComponent.prototype, "markers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], DeletePanelComponent.prototype, "mapRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], DeletePanelComponent.prototype, "records", void 0);
    DeletePanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-delete-panel',
            template: __webpack_require__("./src/app/delete-panel/delete-panel.component.html"),
            styles: [__webpack_require__("./src/app/delete-panel/delete-panel.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__db_accessor_service__["a" /* DbAccessorService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]])
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

module.exports = "\n@import \"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700\";\n/*\n    DEMO STYLE\n*/\nbody {\n    font-family: 'Poppins', sans-serif;\n    background: #fafafa;\n}\np {\n    font-family: 'Poppins', sans-serif;\n    font-size: 1.1em;\n    font-weight: 300;\n    line-height: 1.7em;\n    color: #999;\n}\na, a:hover, a:focus {\n    color: inherit;\n    text-decoration: none;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n}\n.navbar {\n    padding: 15px 10px;\n    background: #fff;\n    border: none;\n    border-radius: 0;\n    margin-bottom: 40px;\n    -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n}\n.navbar-btn {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    outline: none !important;\n    border: none;\n}\n.line {\n    width: 100%;\n    height: 1px;\n    border-bottom: 1px dashed #ddd;\n    margin: 40px 0;\n}\n/* ---------------------------------------------------\n    SIDEBAR STYLE\n----------------------------------------------------- */\n.wrapper2 {\n    left: 0px;\n    width:20%;\n    bottom:0px;\n    height: 100%;\n    position: absolute;\n    background: #353531;\n    color: #fff;\n    /* display: flex; */\n    /* align-items: stretch; */\n    /* perspective: 1500px; */\n}\n#sidebar {\n    min-width: 250px;\n    max-width: 250px;\n    background: #353531;\n    color: #fff;\n    -webkit-transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);\n    transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);\n    -webkit-transform-origin: bottom left;\n            transform-origin: bottom left;\n}\n#sidebar.active {\n    margin-left: -250px;\n    -webkit-transform: rotateY(100deg);\n            transform: rotateY(100deg);\n}\n#sidebar .sidebar-header {\n    padding: 20px;\n    background: #353531;\n}\n#sidebar ul.components {\n    padding: 20px 0;\n    border-bottom: 1px solid #47748b;\n}\n#sidebar ul p {\n    color: #fff;\n    padding: 10px;\n}\n#sidebar ul li a {\n    padding: 10px;\n    font-size: 1.1em;\n    display: block;\n}\n#sidebar ul li a:hover {\n    color: #353531;\n    background: #fff;\n}\n#sidebar ul li.active > a, a[aria-expanded=\"true\"] {\n    color: #fff;\n    background: #353531;\n}\na[data-toggle=\"collapse\"] {\n    position: relative;\n}\na[aria-expanded=\"false\"]::before, a[aria-expanded=\"true\"]::before {\n    content: '\\e259';\n    display: block;\n    position: absolute;\n    right: 20px;\n    font-family: 'Glyphicons Halflings';\n    font-size: 0.6em;\n}\na[aria-expanded=\"true\"]::before {\n    content: '\\e260';\n}\nul ul a {\n    font-size: 0.9em !important;\n    padding-left: 30px !important;\n    background: #353531;\n}\nul.CTAs {\n    padding: 20px;\n}\nul.CTAs a {\n    text-align: center;\n    font-size: 0.9em !important;\n    display: block;\n    border-radius: 5px;\n    margin-bottom: 5px;\n}\na.download {\n    background: #fff;\n    color: #353531;\n}\na.article, a.article:hover {\n    background: #353531 !important;\n    color: #fff !important;\n}\n/* ---------------------------------------------------\n    CONTENT STYLE\n----------------------------------------------------- */\n#content {\n    padding: 20px;\n    min-height: 100vh;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n}\n#sidebarCollapse {\n    width: 40px;\n    height: 40px;\n    background: #f5f5f5;\n}\n#sidebarCollapse span {\n    width: 80%;\n    height: 2px;\n    margin: 0 auto;\n    display: block;\n    background: #555;\n    -webkit-transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);\n    transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);\n    -webkit-transition-delay: 0.2s;\n            transition-delay: 0.2s;\n}\n#sidebarCollapse span:first-of-type {\n    -webkit-transform: rotate(45deg) translate(2px, 2px);\n            transform: rotate(45deg) translate(2px, 2px);\n}\n#sidebarCollapse span:nth-of-type(2) {\n    opacity: 0;\n}\n#sidebarCollapse span:last-of-type {\n    -webkit-transform: rotate(-45deg) translate(1px, -1px);\n            transform: rotate(-45deg) translate(1px, -1px);\n}\n#sidebarCollapse.active span {\n    -webkit-transform: none;\n            transform: none;\n    opacity: 1;\n    margin: 5px auto;\n}\n/* ---------------------------------------------------\n    MEDIAQUERIES\n----------------------------------------------------- */\n@media (max-width: 768px) {\n    #sidebar {\n        margin-left: -250px;\n        -webkit-transform: rotateY(90deg);\n                transform: rotateY(90deg);\n    }\n    #sidebar.active {\n        margin-left: 0;\n        -webkit-transform: none;\n                transform: none;\n    }\n    #sidebarCollapse span:first-of-type,\n    #sidebarCollapse span:nth-of-type(2),\n    #sidebarCollapse span:last-of-type {\n        -webkit-transform: none;\n                transform: none;\n        opacity: 1;\n        margin: 5px auto;\n    }\n    #sidebarCollapse.active span {\n        margin: 0 auto;\n    }\n    #sidebarCollapse.active span:first-of-type {\n        -webkit-transform: rotate(45deg) translate(2px, 2px);\n                transform: rotate(45deg) translate(2px, 2px);\n    }\n    #sidebarCollapse.active span:nth-of-type(2) {\n        opacity: 0;\n    }\n    #sidebarCollapse.active span:last-of-type {\n        -webkit-transform: rotate(-45deg) translate(1px, -1px);\n                transform: rotate(-45deg) translate(1px, -1px);\n    }\n}\n.btn-ct {\n    border-radius: 5px;\n    width: 35%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n}\n#show-listings {\n    left:10%;\n}\n#hide-listings {\n    right:10%;\n}\n.divider1{\n    width:12%;\n    height:auto;\n    display:inline-block;\n}\n.divider2{\n    width:8%;\n    height:auto;\n    display:inline-block;\n}\n#zoom-to-area-text {\n    margin-left: 10px;\n    width: 95%;\n    display:inline-block;\n}\n#zoom-to-area{\n    width: 40%;\n    margin-right: 30%;\n    margin-top: 10px;\n    margin-bottom: 20px;\n    float: right;\n}\n#toggle-drawing{\n    width: 40%;\n    margin-right: 30%;\n    margin-top: 10px;\n    margin-bottom: 20px;\n    float: right;\n}\n#draw {\n    margin-right: 1%;\n    margin-top: 10px;\n    text-align: center;\n}\nhr{\n    border-color: white;\n}\n.wrapper2 {\n    overflow-y: scroll;\n    padding-right: 15px; /* Increase/decrease this value for cross-browser compatibility */\n    -webkit-box-sizing: content-box;\n            box-sizing: content-box; /* So the width will be 100% + 17px */\n  }\n"

/***/ }),

/***/ "./src/app/side-panel/side-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper2\">\n        <!-- Sidebar Header -->\n        <div class=\"sidebar-header2\">\n            <br/>\n            <h4 align=\"center\">Let's Build a Safer Community</h4>\n            <!-- <h6>\n                Welcome to Tian's App!\n            </h6> -->\n        </div>\n        <br/>\n        <div>\n          <div class=\"divider2\"></div>\n          <input class=\"btn-warning btn-ct\" id=\"show-listings\" type=\"button\" value=\"Show Listings\" (click)=\"onClickShow()\">\n          <div class=\"divider2\"></div>\n          <input class=\"btn-warning btn-ct\" id=\"hide-listings\" type=\"button\" value=\"Hide Listings\" (click)=\"onClickHide()\">\n          <div class=\"divider1\"></div>\n        </div>\n        <div>\n          <input [(ngModel)]=\"zoomPlace\" id=\"zoom-to-area-text\" type=\"text\" placeholder=\"Enter the area you want to check.\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\">\n          <input class=\"btn btn-default btn-ct\" id=\"zoom-to-area\" type=\"button\" value=\"Zoom\" (click)=\"onClickZoom()\">\n        </div>\n        <app-add-panel [mapRef]='this.mapRef' [markers]='this.markers' [records]='this.records'></app-add-panel>\n        <br/>\n        <app-delete-panel [mapRef]='this.mapRef' [markers]='this.markers' [records]='this.records'></app-delete-panel>\n        <br/>\n        <hr>\n        <div id=\"draw\">\n            <span id=\"draw\">Draw a shape to search within it    </span><br/>\n            <input class=\"btn btn-default\" id=\"toggle-drawing\"  type=\"button\" value=\"Drawing Tools\" (click)=\"OnClickDraw()\" >\n        </div>     \n        <br/>\n        <br/>\n        <hr>\n        <div>\n          <span class=\"text\"> Within </span>\n          <select [(ngModel)]=\"maxDuration\" id=\"max-duration\" class=\"custom-select\">\n            <option value=\"10\">10 min</option>\n            <option value=\"15\">15 min</option>\n            <option value=\"30\">30 min</option>\n            <option value=\"60\">1 hour</option>\n          </select>\n          <select [(ngModel)]=\"travelMode\" id=\"mode\" class=\"custom-select\">\n            <option value=\"DRIVING\">drive</option>\n            <option value=\"WALKING\">walk</option>\n            <option value=\"BICYCLING\">bike</option>\n            <option value=\"TRANSIT\">transit ride</option>\n          </select>\n          <span class=\"text\">of</span>\n          <br/>\n          <input [(ngModel)]=\"searchTimeAddress\" id=\"search-within-time-text\" type=\"text\" placeholder=\"Ex: UC Berkeley, Berkeley, CA\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\">\n          <input class=\"btn btn-default btn-ct\" id=\"search-within-time\" type=\"button\" value=\"Go\" (click)=\"seachAddressDistance()\">\n        </div>\n        <hr>\n        <div>\n          <span class=\"text\">Search for nearby places</span>\n          <input id=\"places-search\" type=\"text\" placeholder=\"Ex: Pizza delivery in UCB\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\">          \n          <input class=\"btn btn-default btn-ct\" id=\"go-places\" type=\"button\" value=\"Go\">\n        </div>\n\n</div>"

/***/ }),

/***/ "./src/app/side-panel/side-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidePanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add_panel_add_panel_component__ = __webpack_require__("./src/app/add-panel/add-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__delete_panel_delete_panel_component__ = __webpack_require__("./src/app/delete-panel/delete-panel.component.ts");
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
        // console.log('haha' + this.markers);
        this.mapRef.showListings();
    };
    SidePanelComponent.prototype.onClickHide = function () {
        // console.log('haha' + this.markers);
        this.mapRef.hideMarkers(this.mapRef.markers);
    };
    SidePanelComponent.prototype.onClickZoom = function () {
        this.mapRef.zoomToArea();
    };
    SidePanelComponent.prototype.OnClickDraw = function () {
        this.mapRef.toggleDrawing(this.mapRef.drawingManager);
    };
    SidePanelComponent.prototype.seachAddressDistance = function () {
        this.mapRef.searchWithinTime();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])('markers'),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "markers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])('mapRef'),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "mapRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])('records'),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "records", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SidePanelComponent.prototype, "getAddress", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__add_panel_add_panel_component__["a" /* AddPanelComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__add_panel_add_panel_component__["a" /* AddPanelComponent */])
    ], SidePanelComponent.prototype, "addPanel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__delete_panel_delete_panel_component__["a" /* DeletePanelComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__delete_panel_delete_panel_component__["a" /* DeletePanelComponent */])
    ], SidePanelComponent.prototype, "deletePanel", void 0);
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