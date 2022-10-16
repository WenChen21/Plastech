import './App.css';
import BarChart from './components/barchart';
import {MDBCard, MDBCardBody, MDBCardTitle} from 'mdb-react-ui-kit';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child } from 'firebase/database'
import {memo, useState, useRef, useEffect} from 'react'
import readUserData from './firebase'


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
  //let i = 0;
  // while (true){
  //   if (i%60 === 0){
  //     dataarray.push(readUserData("default"));
  //   }
  // }
  var [dataarray, Setdata] = useState([]);

  console.log("***", dataarray)
  useEffect(() => readUserData(Setdata), [])

  return (
    <div className="App">
      <div className="home-container">
        {/* <section class ="navbar">
          <div className="Title">
            <ul>
              <li><a href="#home">PlastechEye</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#graph">Graph</a></li>
            </ul>
          </div>
        </section>  */}
        
      {/* </div>
        <section className="about">
          <div className="aboutcss">
          <h2><a name="about"> About</a></h2>
          <p1>
          </p1>
          </div>
        </section> */}
        </div>
      
        
    <div className ="graph-title">
      <h2><a name="graph">Plastech</a> </h2>
    </div>
    <section className ="card-grid">
    
      <div className="Bar1">
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Plastic Waste Tracker</MDBCardTitle>
            <BarChart data={dataarray}/>
          </MDBCardBody>
        </MDBCard>
      </div>

      <div className="Bar2">
        <MDBCard>
          <MDBCardBody>
          <h4>Be the change in <br/>
          this world. Recycle <br/>
          and reduce waste! </h4>
          </MDBCardBody>
        </MDBCard>
      </div>
    </section>

    <section className = "card-grid2">
      <div className="Bar4">
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>About</MDBCardTitle>
            <h3>Plastech will look at food waste and recyclable items. Everytime a person throws an item into
            the trashcan, it will counts the number of items being thrown into the trashcan. 
            This is done with a camera that will be installed within the trashcan and using a trained machine-learning model
           that will distinguish between the items and send data to the database the data which is represented by the graph above. </h3>
          </MDBCardBody>
        </MDBCard>
      </div>
    </section>
  </div>
  );

}
export default App;

// https://www.geeksforgeeks.org/how-to-perform-fetch-and-send-with-firestore-using-reactjs/