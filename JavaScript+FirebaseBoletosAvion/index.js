var firebaseConfig = {
    apiKey: "AIzaSyAohvvqAz8exrG4lWC5V_dXcYkIuS9W33w",
  authDomain: "fir-bas-9ef46.firebaseapp.com",
  databaseURL: "https://fir-bas-9ef46-default-rtdb.firebaseio.com",
  projectId: "fir-bas-9ef46",
  storageBucket: "fir-bas-9ef46.appspot.com",
  messagingSenderId: "717483679345",
  appId: "1:717483679345:web:6f2f52c0e3cad9f1d245d0",
  measurementId: "G-8LX7BGD64W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    document.getElementById("Input8").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var cod = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var apellido = document.getElementById("Input3").value;
    var desde = document.getElementById("Input4").value;
    var hasta = document.getElementById("Input5").value;
    var FechaSal = document.getElementById("Input6").value;
    var FechaReg = document.getElementById("Input7").value;
    var pasajeros = document.getElementById("Input8").value;

    //validaciones
    if (cod.length > 0) {
        //creo un objeto que guarda los datos
        var RegisBoletos = {
            cod,
            nombre, 
            apellido,
            desde,
            hasta,
            FechaSal,
            FechaReg,
            pasajeros,
        }

        //console.log(RegisBoletos);

        firebase.database().ref('Registro de Boletos/' + cod).update(RegisBoletos).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Registro de Boletos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(RegisBoletos){
    
    if(RegisBoletos!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = RegisBoletos.cod;
        cell2.innerHTML = RegisBoletos.nombre;
        cell3.innerHTML = RegisBoletos.apellido; 
        cell4.innerHTML = RegisBoletos.desde;
        cell5.innerHTML = RegisBoletos.hasta; 
        cell6.innerHTML = RegisBoletos.FechaSal; 
        cell7.innerHTML = RegisBoletos.FechaReg; 
        cell8.innerHTML = RegisBoletos.pasajeros; 
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${RegisBoletos.cod})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+RegisBoletos.cod+')">Modificar</button>';
    }
}

function deleteR(cod){
    firebase.database().ref('Registro de Boletos/' + cod).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(cod){
    var ref = firebase.database().ref('Registro de Boletos/' + cod);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(RegisBoletos){
    if(RegisBoletos!=null)
    {
        document.getElementById("Input1").value=RegisBoletos.cod;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=RegisBoletos.nombre;
        document.getElementById("Input3").value=RegisBoletos.apellido;
        document.getElementById("Input4").value=RegisBoletos.desde;
        document.getElementById("Input5").value=RegisBoletos.hasta;
        document.getElementById("Input6").value=RegisBoletos.FechaSal;
        document.getElementById("Input7").value=RegisBoletos.FechaReg;
        document.getElementById("Input8").value=RegisBoletos.pasajeros;

    }
}



function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input11").value;

    var ref = firebase.database().ref("Registro de Boletos");
    ref.orderByChild("pasajeros").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(RegisBoletos){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = RegisBoletos.cod;
    cell2.innerHTML = RegisBoletos.nombre;
    cell3.innerHTML = RegisBoletos.apellido; 
    cell4.innerHTML = RegisBoletos.desde;
    cell5.innerHTML = RegisBoletos.hasta; 
    cell6.innerHTML = RegisBoletos.FechaSal; 
    cell7.innerHTML = RegisBoletos.FechaReg; 
    cell8.innerHTML = RegisBoletos.pasajeros; 
   
}