   // This example requires the Places library. Include the libraries=places
            // parameter when you first load the API. For example:
            // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
            var map;
            var infowindow;
            var current_lat;
            var current_lng;

            function initMap() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(p) {
                        current_lat = p.coords.latitude;
                        current_lng = p.coords.longitude;
                        console.log(current_lat);
                        console.log(current_lng);
                        ///////
                        var pyrmont = {
                            lat: current_lat,
                            lng: current_lng
                        };
                        //   var pyrmont = {lat: 30.0444196, lng: 31.2357116};
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: pyrmont,
                            zoom: 15
                        });
                        infowindow = new google.maps.InfoWindow();
                        var service = new google.maps.places.PlacesService(map);
                        service.nearbySearch({
                            location: pyrmont,
                            radius: 500,
                            type: ['mosque']
                        }, callback);
                    });
                } else {
                    alert('Geo Location feature is not supported in this browser.');
                }
            }

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


