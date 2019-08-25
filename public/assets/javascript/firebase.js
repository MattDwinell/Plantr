window.onload = function () {
    console.log("firebase auth initilializing");
    var firebaseConfig = {
        apiKey: "AIzaSyBmJxKi8lcOybwbxh5v_ZitkxV7eiCLWWI",
        authDomain: "plantr-a16f0.firebaseapp.com",
        databaseURL: "https://plantr-a16f0.firebaseio.com",
        projectId: "plantr-a16f0",
        storageBucket: "",
        messagingSenderId: "151889773346",
        appId: "1:151889773346:web:8d6936b3a023e97c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    //when stuff is added or taken away from the system for the user:
    database.ref().on("value", function (snap) {
        console.log(snap.val());
    })


    //firebase authentication stuff:
    document.addEventListener("click", function (event) {
        if (event.target.matches("#sign-in")) {



            event.preventDefault();
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            console.log(email, password);
            if (!email || !password) {
                document.getElementById("sign-in-message").textContent = "please input both email and password to sign in, or create one by registering an account.";
            } else {
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                    console.log(error, error.message);
                    document.getElementById("sign-in-message").textContent = error.message;
                });
            }

        } else if (event.target.matches("#register")){
            event.preventDefault();
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            console.log(email, password);
            if (!email || !password) {
                document.getElementById("sign-in-message").textContent = "please input both email and password to sign in, or create one by registering an account.";
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                    console.log(error.message);
                    document.getElementById("sign-in-message").textContent = error.message;
                });
            }
        } else if (event.target.matches(".sign-out")){
            firebase.auth().signOut();
        }
        else {
            return false;
        }
    }, false)

    var currentUser;
    var currentUserEmail;

    //firebase on user login stuff
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user;
            currentUserEmail = user.email;
            document.getElementById("welcome-banner").textContent = "Welcome to PlantR, " + user.email + "! Please complete your profile to get started.";
            document.getElementById("sign-in-wrapper").style.display = 'none';
            document.getElementById("app-wrapper").style.display = "block";
            window.localStorage.setItem('user-email', user.email);

        } else {
            console.log("logged out");
            document.getElementById("sign-in-wrapper").style.display = 'block';
            document.getElementById("app-wrapper").style.display = "none";
            document.getElementById("sign-in-message").textContent = "Welcome to PlantR! Please sign in."
            window.localStorage.clear();

        }
    })






}