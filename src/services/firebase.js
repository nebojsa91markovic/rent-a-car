import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBvQH7As5iC3Bojfw1H7edMQQPFH4JMKwA",
  authDomain: "rent-a-car-5f08c.firebaseapp.com",
  databaseURL: "https://rent-a-car-5f08c.firebaseio.com",
  projectId: "rent-a-car-5f08c",
  storageBucket: "rent-a-car-5f08c.appspot.com",
  messagingSenderId: "171742324073",
  appId: "1:171742324073:web:60f8c80f6bc8621bd009f8"
};


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
