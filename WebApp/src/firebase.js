import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from 'firebase/database'


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
// reference to database

export const writeUserData = (userId, t, amt) => {
  console.log(amt)
  const db = getDatabase(app);
  set(ref(db, 'users/' + userId), {
    type: t,
    amount: amt
  });
}

export function readUserData(Setdata) {
  onValue(ref(getDatabase(app), '/users/default/amount'), (snapshot) => {
      Setdata(snapshot.val())
      console.log("****", snapshot.val())
      // ...
    })
}

// https://firebase.google.com/docs/database/web/read-and-write
// const updateCounter = (num, data) =>{
//   num = num + data
// }

// export const readUserData = (userId, numElt) => {
//   const db = getDatabase(app);
//   const starCountRef = ref(db, 'posts/' + userId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateCounter(numElt, data);
// });

// }