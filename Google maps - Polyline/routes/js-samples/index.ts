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

  // TODO: need to replace the hard coded Json value, fetch from IO file or MySQL database 
    const instance = axios.create({
        baseURL: "http://127.0.0.1:5000/",
        headers: {
        "Content-Type": "application/json",
        },
    });
    async function getAllData() {
        var data = await instance.get("/get_coordinates/1");
        var flightPlanCoordinates = data.data['route'];
        const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
        
          flightPath.setMap(map);
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

