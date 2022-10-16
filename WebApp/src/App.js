// Base code from github repo https://github.com/nicknochnack/RealTimeObjectDetectionTFJSReact

// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import { writeUserData, readUserData} from "./firebase"
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue, child, get} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyApSIjznIL0RDozD4GwRwnybpOIO7WznwA",
  authDomain: "data-98b1c.firebaseapp.com",
  databaseURL: "https://data-98b1c-default-rtdb.firebaseio.com/",
  projectId: "data-98b1c",
  storageBucket: "data-98b1c.appspot.com",
  messagingSenderId: "213303490255",
  appId: "1:213303490255:web:abd92b7c63ca379a4269ba"
};
const app = initializeApp(firebaseConfig)

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const dbRef = ref(getDatabase(app));

  var [dataarray, Setdata] = useState([]);
  useEffect(() => readUserData(Setdata), [])

  console.log("**aa", dataarray)

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net, dataarray);
    }, 2500);
  };

  const detect = async (net, dataarray) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      const plasticObjects = {"bottle": 0.67, "bag": 0.42, "cup": 0.52}
      const foodObjects = {"apple": 1.2, "orange": 1.4}
      
      var type = ""
      var amt = 0

      for (let i = 0; i < obj.length; i++) {
        if (obj[i]["class"] in plasticObjects) {
          type = "plastic"
          amt = plasticObjects[obj[i]["class"]]
        } else if (obj[i]["class"] in foodObjects) {
          type = "food"
          amt = foodObjects[obj[i]["class"]]
        }
      }

      console.log(type)
      console.log(amt)
      
      console.log("***", dataarray)

      dataarray = await get(child(dbRef, `users/default/amount`)).then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      var writedata = [...dataarray]
      writedata[writedata.length - 1] = dataarray[writedata.length - 1] + amt

      writeUserData("default", type, writedata)

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;

