const firebaseConfig = {
    apiKey: "AIzaSyD7Hi9jAJSZ6eDfe90fgIT4_1d3jyMTDAc",
    authDomain: "datos-de-formulario-a3c46.firebaseapp.com",
    projectId: "datos-de-formulario-a3c46",
    storageBucket: "datos-de-formulario-a3c46.appspot.com",
    messagingSenderId: "967407971192",
    appId: "1:967407971192:web:645c4eb3c47850a159368d",
    measurementId: "G-ZQSWNQRP1F"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
    event.preventDefault()

    // Validar campo nombre
    let entradaNombre = document.getElementById("name")
    let errorNombre = document.getElementById("nameError")

    if (entradaNombre.value.trim() === "") {
        errorNombre.textContent = "Por favor, ingresa tu nombre"
        errorNombre.classList.add("error-message")
    }else{
        errorNombre.textContent = ""
        errorNombre.classList.remove("error-message")
    }

    // Validar correo electronico
    let emailEntrada = document.getElementById("email")
    let emailError = document.getElementById("emailError")
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = "Por favor, introduce un correo valido"
        emailError.classList.add("error-message")
    } else {
        emailError.textContent = ""
        emailError.classList.remove("error-message")
    }

    // Validar la contraseña
    let contrasenaEntrada = document.getElementById("password")
    let contrasenaError = document.getElementById("passwordError")
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = "La contraseña debe tener entre 8 y 15 caracteres, mayusculas, minusculas y numeros"
        contrasenaError.classList.add("error-message")
    } else {
        contrasenaError.textContent = ""
        contrasenaError.classList.remove("error-message")
    }

    // Si todos los campos son validos enviar el formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert("El formulario se ha enviado con exito", docRef.id)
            document.getElementById("formulario").reset();
        })
        .catch((error) => {
            alert(error)
        });
    }
})