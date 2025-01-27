//Config firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_yF5Y90-GsKfO7fZWmS6OQFv5Gj7B8a8",
  authDomain: "cmyk-orange.firebaseapp.com",
  projectId: "cmyk-orange",
  storageBucket: "cmyk-orange.appspot.com",
  messagingSenderId: "179241068454",
  appId: "1:179241068454:web:5e1763ec4bbee8ef5d5167",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Sign up with email and password
const registrationForm = document.querySelector("#registrationForm");

//Signup with email and password

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name1 = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const repeatepassword = document.querySelector("#repeatepassword").value;
  if (password === repeatepassword) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        registrationForm.reset();
        console.log(userCredential);
        console.log("sign up");

        const usuario = {
          name: name1,
          email: email,
          uid: userCredential.user.uid,
        };

        localStorage.setItem("user", JSON.stringify(usuario));

        window.location.assign(`registro-paso2.html`);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Las contraseñas deben ser las mismas");
  }
});

//Signup with Google
const googleButton = document.querySelector("#btn-inicio-google");
googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      registrationForm.reset();
      window.location.assign(`registro-paso2.html`);
    })
    .catch((err) => {
      console.error(err);
    });
});

//Boton de usuario registrado hacia la home
const yaEstoyRegistrado = document.querySelector(".btn-principal");

yaEstoyRegistrado.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(`/index.html`);
});
