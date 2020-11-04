// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAiJmTBbQL5dTlPt--u4PKIJ579lUGq-Pw",
    authDomain: "calc-app-539b3.firebaseapp.com",
    databaseURL: "https://calc-app-539b3.firebaseio.com",
    projectId: "calc-app-539b3",
    storageBucket: "calc-app-539b3.appspot.com",
    messagingSenderId: "743158712885",
    appId: "1:743158712885:web:3a74268ba0c9b45f0aff7c",
    measurementId: "G-5L4BR61XV3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  let myName =  prompt('Enter your name');
  const calc = (e) => {

     e.preventDefault();
      //get message
    const num1 = parseFloat(document.getElementById("n1").value)
    const num2 = parseFloat(document.getElementById("n2").value)
    const operate = document.getElementById("opr").value;

     let ans;
    

    if(operate === '+'){
        ans = document.getElementById('result').value = num1+num2;
     
    }
    if(operate === '-'){
        ans = document.getElementById('result').value = num1-num2;
     
    }
    if(operate === '/'){
         ans = document.getElementById('result').value = num1/num2;
    }
    if(operate === 'x'){
        ans = document.getElementById('result').value = num1*num2;
     
    }
    if(operate === '%'){
       ans = document.getElementById('result').value = num1%num2;
     
    }

    //save in database
    firebase.database().ref('results').push().set({
        "sender":myName,  
        "n1": num1,
        "n2": num2,
        "opr":operate,
        "result": ans,
        
       
    })

      return false;
  }

  //Listen for incoming messages
  firebase.database().ref("results").limitToLast(10).on("child_added", function(snapshot) {
   const show = document.querySelector('.show');

    let html ="";
    html += "<p>";
    html +=snapshot.val().sender + ": " + snapshot.val().n1 +" " +  snapshot.val().opr + " "  + snapshot.val().n2 + " = " + snapshot.val().result;
    html += "</p>";

    show.innerHTML += html

  })