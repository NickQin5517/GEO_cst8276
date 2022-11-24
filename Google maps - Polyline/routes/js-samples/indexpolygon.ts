// This example creates a simple polygon representing the Bermuda Triangle.
import axios from 'axios';

function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: "terrain",
      }
    );
  
    // Create Div
    var div = document.createElement('div');
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '0px';
    div.style.position = 'relative';
    div.style.cursor = "pointer";
  
    // Create Button
    var button = document.createElement("button");
    button.innerHTML = "Click Here for Polyline!";
    button.style.position = 'absolute';
    button.style.cursor = "pointer";
    button.style.height = '50px';
    button.style.width = '80px';
    div.appendChild(button);
  
    // Create onclick method to redirect to another page
    button.addEventListener("click", function() {
      window.location.href="index.html";
  
    });
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(div);

    const instance = axios.create({
      baseURL: "http://127.0.0.1:5000/",
      headers: {
      "Content-Type": "application/json",
      },
  });
  async function getAllData() {
      var data = await instance.get("/get_location");

      // Define the LatLng coordinates for the polygon's path.
      var triangleCoords = data.data['coordinates'];

      // Construct the polygon.
      const bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });

      bermudaTriangle.setMap(map);
       
      //center the polygon      
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < triangleCoords.length; i++) {
        bounds.extend(triangleCoords[i]);
      }
      map.fitBounds(bounds);

  }
  getAllData();

  }
  
  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;
  export {};
  