//GLOBAL VARIABLES:
  var latitude = null;
  var longitude = null;
  var marker = null;
  var postcode = null;
  var suburb = null;
  var country = null;
  var woeid = null;
  var keyword = "traffic";

//Google Map APIs
//Code adapted from:
//https://developers.google.com/maps/documentation/javascript/places-autocomplete?authuser=1#places_searchbox
//https://google-developers.appspot.com/maps/documentation/javascript/examples/geocoding-reverse

function geocodeLatLng(latitude, longitude) {
  var geocoder = new google.maps.Geocoder;
  var latlng = {lat: latitude, lng: longitude};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);
        country = results[6].formatted_address;
        suburb = results[1].address_components[0].long_name;
        var address = results[1].formatted_address;
        var data = results[1].address_components;

        $.each(data, function(index0, i){
          postcode = i.long_name; //make sure it gets the last address component in all cases
        });

        /*//console.log(postcode); //This bit gets WOEID's.
        if (postcode == "Australia") {
          alert("Perhaps this isn't the best place to look for tweets? Try another location?");
        } else {
          $('#statbox').append('\nAddress: ' + address);
          getWOEID();
        }*/

      } else {
        window.alert('No results found');
      }
    }); 
}

//WOEID RETRIEVAL:
//Referenced from:
//https://developer.yahoo.com/geo/geoplanet/guide/api_docs.html#api_overview
//https://developer.yahoo.com/geo/geoplanet/guide/yql-tables.html#yql-summary

/*function getWOEID(){
  var pcURL = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + suburb + "%22&format=xml"
  $.get(pcURL, function(){
    console.log("WOEID Retrieval - Process Initiated");
  })
    .done(function(data){
      console.log("WOEID Retreival - WOEID Found");
      console.log(data);

      //Adapted from: http://code.tutsplus.com/tutorials/quick-tip-use-jquery-to-retrieve-data-from-an-xml-file--net-390
      $(data).find('woeid').each(function(){
        var $woeid = $(this); 
        woeid = ($woeid[0].textContent);
        //console.log(woeid);
      });

    })
    .fail(function() {
      console.log( "WOEID Retrieval - Process Error" );
    })
    .always(function() {
      console.log( "WOEID Retreival - Process Complete" );
      $('#statbox').append('\n\nWOEID: ' + woeid);
    })
};*/

$(document).ready(function(){  

  //TEST BUTTON AJAX:
  //===============================================

  /*$('#test_btn').click(function(){
    console.log('Test Button!');
    $.ajax({
      method: "POST",
      url: "http://localhost:5000/twitter"
    })
    .done(function(data) {
      console.log( "TEST - Success" );
      console.log(data);
    })
    .fail(function() {
      console.log( "TEST - Error" );
    })
    .always(function() {
      console.log( "TEST - Completed" );
    });
  });*/


  //Twit NPM
  //Referenced from:
  //https://github.com/ttezel/twit

  $('#twit_btn').click(function() {  //Trying to use node server and use Twit
    console.log('Twit Button Pressed');
    $.ajax({
      method: "POST",
      url: "http://localhost:5000/twitter"
    })
    .done(function(data) {
      console.log( "Twit - Process Success" );
      console.log(data);
      $('#wordcloud_btn').removeAttr('disabled');
      $('#timeline_btn').removeAttr('disabled');
      createWC();
    })
    .fail(function() {
      console.log( "Twit - Process Error" );
    })
    .always(function() {
      console.log( "Twit - Process Completed" );
    });
  });

  //Authentication Token 1.0a AJAX:
  //Referenced from:
  //https://dev.twitter.com/oauth/application-only
  //Base64 Encoding function: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa

  /*$('#oauth').click(function() {
    getAuthToken();
  });

  function getAuthToken () {
    var consumer_key = "w66tWmtsphzxLdUJpS03cVKuE";
    var consumer_secret = "BOJ4VxwsgJVjuhWIEQIslCRUrud83gVmEJKnGNv4xaysc1kv91";
    var consumer_concat = consumer_key + ":" + consumer_secret;
    
    $.ajax({
      method: "POST",
      url: "https://api.twitter.com/oauth2/token",
      contentType: "application/x-www-form-urlencoded;charset=UTF-8",
      //body: grant_type=client_credentials,

      beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(consumer_key + ":" + consumer_secret));
      },

      //grant_type=client_credentials

    })
      .done(function() {
        console.log( "Authentication Token - Process Success" );
        console.log(data);
      })
      .fail(function() {
        console.log( "Authentication Token - Process Error" );
      })
      .always(function() {
        console.log( "Authentication Token - Process Completed" );
      });
  }*/

  //Twitter Geolocation AJAX:

  /*$("#twitter").click(function() {
    $.ajax({
      method: "GET",
      url: "https://api.twitter.com/1.1/geo/search.json?query="+ keyword +"lat=" + latitude + "&long=" + longitude +"&accuracy=100m",
    })
      .done(function() {
        console.log( "Twitter Geolocation - Process Success" );
        console.log(data);
      })
      .fail(function() {
        console.log( "Twitter Geolocation - Process Error" );
      })
      .always(function() {
        console.log( "Twitter Geolocation - Process Completed" );
      });
  });*/

  //Reference: 
  //https://dev.twitter.com/rest/reference/get/trends/place
  //http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
  //http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript

  //Need to emulate the oAuth header as per below...
  //OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"

  //Below is not necessary - also requires server side processing - implement later?
  /*function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return [].map.call(arr, function(n) { return n.toString(16); }).join("");
  }

  $('#trends').click(function(){
    console.log('You clicked the button!');
    //generate an oauth signature - must be unique each time, length of 32 characters.
    var string = generateId(40); //this was variable in length - so made it longer, then cut to size.
    console.log(string);
    var length = 32;
    var oauth_signature = string.substr(0, length);
    console.log('Length of string: ' + oauth_signature.length);

    var oauth_timestamp = new Date().getTime();
    console.log(oauth_timestamp);

    trendURL = "https://api.twitter.com/1.1/trends/place.json?id=" + woeid;
    oauthStr = 'OAuth oauth_consumer_key="w66tWmtsphzxLdUJpS03cVKuE", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="' + oauth_signature + '", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + oauth_timestamp + '", oauth_token="389868811-hALJlOtoPVFm9kymPexSiEgevwtI3S6dNhDMLWmQ", oauth_version="1.0"'

    $.ajax({
      method: "GET",
      url: trendURL,
      contentType: 'text/plain',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        oauthStr
      },
    })
      .done(function() {
        console.log( "second success" );
        console.log(data);
      })
      .fail(function() {
        console.log( "error" );
      })
      .always(function() {
        console.log( "finished" );
      });
  });*/

  //TIME-LINE:
  //vis.js

  /*$('#timeline_btn').click(function(){
    
    $('#time_vis').show();
    //Below isn't working, does it need to be done via node server?
    /*var container = $('#timeline')

    var items = new vis.DataSet([
      {id: 1, content: 'item 1', start: '2014-04-20'},
      {id: 2, content: 'item 2', start: '2014-04-14'},
      {id: 3, content: 'item 3', start: '2014-04-18'},
      {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
      {id: 5, content: 'item 5', start: '2014-04-25'},
      {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
    ]);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);

  });

  $('#tl_close').click(function(){
    $('#time_vis').hide();
  });*/

  //WORD-CLOUD:
  //Adapted from the following question:
  //http://stackoverflow.com/questions/27672989/dynamically-sized-word-cloud-using-d3-cloud

  /*$('#wordcloud_btn').click(function(){
    $('#wordcloud').show();
  });

  function createWC() {
    myArray = [{"text":"First","size":15},{"text":"Not","size":29},{"text":"Bird","size":20},{"text":"Hello","size":40},{"text":"Word","size":10},{"text":"Marketplaces","size":30}]
    var fillColor = d3.scale.category20b();
    var w = 270, // if you modify this also modify .append("g") .attr -- as half of this
      h = 220;

    d3.layout.cloud().size([w, h])
      .words(myArray) // from list.js
      .padding(5)
      .rotate(0)      
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", drawCloud)
      .start();

    function drawCloud(words) {
    d3.select("#wordcloud").append("svg")
        .attr("width", w)
        .attr("height", h)
      .append("g")
      .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
      .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return (d.size/10) + "vh"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fillColor(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d,i) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            }
        )
      .text(function(d) { return d.text; });
     }
  }

  $('#wc_close').click(function(){
    $('#wordcloud').hide();
  });*/

});

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -31.9535, lng: 115.8570},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  //Determine Lat & Long of clicked location on Google Map
  //Adapted from the following question:
  //http://stackoverflow.com/questions/2770421/how-retrieve-latitude-and-longitude-via-google-maps-api

  google.maps.event.addListener(map, 'click', function(event) {
    //$('#statbox').text('Latitude: ' + event.latLng.lat() + '\n Longitude: ' + event.latLng.lng());
    $('#lat_input').val(event.latLng.lat());
    $('#long_input').val(event.latLng.lng());
    latitude = event.latLng.lat(); //for use in Twitter API
    longitude = event.latLng.lng(); //for use in Twitter API
    createMarker(event.latLng);
    geocodeLatLng(latitude, longitude);
  });

  //This section adapted from:
  //http://www.geocodezip.com/v3_example_click2add_infowindow.html
  //http://stackoverflow.com/questions/3684274/googlemaps-v3-api-create-only-1-marker-on-click
  //http://stackoverflow.com/questions/825794/draw-radius-around-a-point-in-google-map

  function createMarker(location) {
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var radius_int = parseInt($('#radius_input').val());
    console.log(radius_int);
    if (marker) {
      marker.setPosition(location);
      circle.setRadius(radius_int); 
    } else {
      marker = new google.maps.Marker({
        position: myLatlng,
        map: map
      });
      var circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: myLatlng,
        radius: radius_int
      });
      circle.bindTo('center', marker, 'position');
    }
      //console.log(marker);
      marker.setMap(map);
  };

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}