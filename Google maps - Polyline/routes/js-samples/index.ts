/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates a 2-pixel-wide red polyline showing the path of
// the first trans-Pacific flight between Oakland, CA, and Brisbane,
// Australia which was made by Charles Kingsford Smith.
//import { createConnection, ConnectionManager , getConnection}from "typeorm";
import "reflect-metadata";
import axios from 'axios';

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 3,
      center: { lat: 0, lng: -180 },
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
  button.innerHTML = "Click Here for Polygon!";
  button.style.position = 'absolute';
  button.style.cursor = "pointer";
  button.style.height = '50px';
  button.style.width = '80px';
  div.appendChild(button);

  // Create onclick method to redirect to another page
  button.addEventListener("click", function() {
    window.location.href="indexpolygon.html";

  });

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(div);

    const instance = axios.create({
        baseURL: "http://127.0.0.1:5000/",
        headers: {
        "Content-Type": "application/json",
        },
    });
    async function getAllData() {
        var data = await instance.get("/get_coordinates/13");
        var flightPlanCoordinates = data.data['route'];
        console.log(flightPlanCoordinates)
        const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
        
          flightPath.setMap(map);  
          //center the route      
          var bounds = new google.maps.LatLngBounds();
          for (var i = 0; i < flightPlanCoordinates.length; i++) {
            bounds.extend(flightPlanCoordinates[0]);
            bounds.extend(flightPlanCoordinates[i]);
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

