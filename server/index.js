const express=require('express')
const app=express()
const cors = require('cors');
const bcrypt = require('bcrypt');
const bd=require('./bd.js');
const transporter = require("./email.js");


var date = new Date();
var year = date.getFullYear();
var mounth = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);
var newDate = year + "-" + mounth + "-" + day;
var newDateDB=(newDate+' '+date.getHours()+':'+ date.getMinutes()+ ':'+ date.getSeconds());
// console.log(date);


//-------------------------------------------server--------------------------

app.use(express.json())
app.use(cors());

app.listen(3000, () => {
    console.log("server running...");
})


// function html(dateI) {
//     const html = `
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">

//                     <style>
//                         p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
//                         h1{ font-size: 30px !important;}
//                         h2{ font-size: 25px !important;}
//                         h3{ font-size: 18px !important;}
//                         h4{ font-size: 16px !important;}
//                         p, a{font-size: 15px !important;}

                       
//                         .imag{
//                             width: 20px;
//                             height: 20px;
//                         }
//                         .contA{
//                             margin: 0px 5px 0 5px;
//                         }
//                         .afooter{
//                             color: 0006A6 !important; 
//                             text-decoration: none;
//                             font-size: 13px !important;
//                         }
//                 </style>
//                 </head>
//                 <body>
//                 <div style="width: 100%; background-color: #ffff;">
//                     <div style="padding: 20px 10px 20px 10px;">
//                         <!-- Imagen inicial -->
//                         <div style="background-color: #292729; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
//                             <img src="https://st2.depositphotos.com/50337402/47113/v/450/depositphotos_471138654-stock-illustration-bee-golden-line-premium-logo.jpg" alt="" style="width: 200px; height: 60px;">
//                         </div>
//                         <!-- Imagen inicial -->

//                         <!-- Contenido principal -->
//                         <div style="background-color: #0e0709; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
//                             <h1>Tu cita fue creada  exitosamente!💥</h1>
//                             <p>Fecha de tu cita: <span>${dateI}<span></p>                           
//                         </div>
//                         <!-- Contenido principal -->

//                         <!-- Footer -->
//                         <div style="background-color: #4f4f3c; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">


//                             <h4>Soporte</h4>
//                             <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
//                                 Comunícate<br>
//                                 Whatsapp: <a class="afooter" href="https://wa.me/2213452820">+52 22 13 45 28 20</a><br>
//                             </p>
//                             <p style="background-color: #5C6670; padding: 10px 0px 10px 0px; font-size: 12px !important;">
//                                 © 2024 Brandon Saldierna Pérez.
//                             </p>
//                         </div>
                        


//                     </div>
//                 </div>
//                 </body>
//                 </html>`

//     return html;
// }

// -------------------------------------------------APIS--------------------------------------------

// test

function html(dateI, dateF, name) {  
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}

        .claseBoton{
            width: 30%;
                background-color: #B6B4DF;
                color: black; 
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
        }
        .claseBoton:hover{
            background-color: #B6B4DF;
            color: #ffffff;
        }
        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: 0006A6 !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
</style>
</head>
<body>
<div style="width: 100%; background-color: #F579F7;">
    <div style="padding: 20px 10px 20px 10px;">
        <!-- Imagen inicial -->
        <div style="background-color: #791F85; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
            <img src="https://www.modelartspa.com/mas/wp-content/uploads/2020/04/%E2%80%A2Logo-BcoReducicdo.png" alt="" style="width: 200px; height: 60px;">
        </div>
        <!-- Imagen inicial -->

        <!-- Contenido principal -->
        <div style="background-color: #791F85; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
            <h1>Tu cita fue creada  exitosamente!💥</h1>
            <p>${name}</p>

            <!-- Gracias -->
            <p>Fecha de tu cita: <span>${dateI} - ${dateF}<span></p>
            <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo Model Art Spa</p>

            <!-- Botón -->
            <a class="claseBoton" href="https://www.modelartspa.com/mas/inicio/">Model Art Spa</a>
        </div>
        <!-- Contenido principal -->

        <!-- Footer -->
        <div style="background-color: #791F85; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">


            <h4>Soporte</h4>
            <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                Comunícate<br>
                Whatsapp: <a class="afooter" href="https://wa.me/2222547071">+52 222 254 7071</a><br>
            </p>
            <p style="background-color: #5C6670; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                © 2024 Departamento sistemas Model Art Spa.
            </p>
        </div>
        


    </div>
</div>
</body>
</html>`

    return html;
}

app.get("/getHour",(req,res)=>{
    const idUser = req.query.idUser;

    bd.query("SELECT FechaCreacion FROM agenda  WHERE Clientes_IdClientes=?",[idUser,0], (err,result)=>{
       
        if(err){
            res.status(400).send("Error")
        }
    })
})

//ver franquicia si usuario ya ha reguisrado alguna cita
app.get("/getfranchiseUser", (req, res) => {
    const idUser = req.query.idUser;

    bd.query("SELECT ag.Clientes_IdClientes, fr.NombreFranquicia,fr.Estado, fr.IdFranquicias, ag.Fecha FROM agenda AS ag INNER JOIN franquicias AS fr ON ag.Franquicias_IdFranquicias = fr.IdFranquicias WHERE ag.Clientes_IdClientes = ? AND confirmado = ?",[idUser, 0],
        (err, result) => {
            if (err) {
                console.error("Error en la consulta:", err);
                res.status(500).send("Error en la consulta");
            } else {
                // console.log("Resultado", result);
                res.json(result);
            }
        }
    );
});

// ver franquicias en el select
app.get("/getfranchise",(req,res)=>{

    const name = req.query.name;
    console.log(name);
    
    bd.query("SELECT * FROM franquicias WHERE Estado = ?", [name], (err, result) => {
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            res.status(500).send("Error al consultar la base de datos");
        } else {
            res.send(result);
        }
    });
    
})

//ver estados en el select

app.get("/getStatesFran",(req,res)=>{
    bd.query("SELECT DISTINCT Estado FROM franquicias",(err,result)=>{
        res.send(result)
    })
})

//horarios franquicias
app.get("/schedule", (req, res) => {
    const id = req.query.id;
    
    bd.query("SELECT fr.NombreFranquicia,hr.* FROM franquicias as fr INNER JOIN horarios as hr ON fr.IdFranquicias=hr.IdFranquicias where fr.IdFranquicias=?",[id],(err, result) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                res.status(500).send("Error del servidor");
            } else {
                res.json(result);
            }
        }
    );
});

// Guardar Citas 
app.post("/saveCalendar", (req, res) => {
    const { HoraInicio, HoraFin, Fecha, fechaFinal, SP_Agendado, color, idFra, idUser, email,idServ } = req.body;

    // Primer query: Insertar en la tabla agenda
    bd.query("INSERT INTO agenda (Franquicias_IdFranquicias,Clientes_IdClientes,ServiciosFranquicias_IdServiciosFranquicias,SP_Agendado,Fecha,fechaFinal,HoraInicio,HoraFin,Cabina_IdCabina,estatuscitas_IdEstatusCita,Usuarios_IdUsuarios,FechaCreacion,UbicacionCita,color,confirmado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[idFra, idUser,idServ, SP_Agendado, Fecha, fechaFinal, HoraInicio, HoraFin,203,8,1258, newDateDB, 1, color,0],(err, result) => {
            if (err) {
                 res.status(500).send("Error server");
                 console.log(err);
                 
            }
            else{   
                 // Enviar correo si todo fue exitoso
                 transporter.sendMail({
                    from: 'noreply@modelartspa.com',
                    to: email,
                    subject: 'Test email',
                    html: html(HoraInicio,HoraFin,SP_Agendado) // Llamada a tu función para generar el HTML del correo
                }, (mailErr, info) => { 
                    if (mailErr) {
                        return res.status(500).send("Error al enviar el correo");
                    }

                    res.status(200).send("Actualizado y correo enviado");
                });
            }
                   

        }
    );
});

//mostrar citas en el fullCalendar
app.get('/data', (req, res) => {

    const idFra=req.query.idFra;

    bd.query("SELECT * FROM agenda where Franquicias_IdFranquicias =? && UbicacionCita =? && confirmado=? ",[idFra,1,0],(err, result) => {
       if(err){

        res.status(400).send("Error")
       }

       else{

        res.status(200).send(result)

       }
    })
})

//verificar si existe usuario
app.post("/getData", (req, res) => {
    const { name, email, phone } = req.body;

    // Buscar el usuario en la base de datos
    bd.query("SELECT * FROM clientes WHERE NombreCliente = ? AND TelefonoCliente = ? AND CorreoCliente=?", [name, phone, email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al buscar usuario" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Datos no encontrados' });
        }
        
        return res.status(200).json(result);
    });
});

//crear usuario
app.post("/createUser", (req, res) => {
    const { name,phone,email,sex, date } = req.body;

    // Insertar el nuevo usuario en la base de datos
    bd.query("SELECT * FROM clientes WHERE NombreCliente=? || CorreoCliente=? || TelefonoCliente=?", [name,email,phone], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error server' });
        }
        else {

            const nameRep = result.some(cliente => cliente.NombreCliente === name);
            const emailRep = result.some(cliente => cliente.CorreoCliente === email);
            const phoneRep = result.some(cliente => cliente.TelefonoCliente === phone);
            if (nameRep || emailRep || phoneRep) {
                let errorMsg = "Error: ";
                if (nameRep) errorMsg += "Nombre ya existe. ";
                if (emailRep) errorMsg += "Correo ya existe. ";
                if (phoneRep) errorMsg += "Celular ya existe.";
                return res.status(400).json({ message: errorMsg.trim() });
            }   
            else {
                bd.query("INSERT INTO clientes (NombreCliente,FechaNacimientoCliente,TelefonoCliente,SexoCliente,CorreoCliente,FechaCreacion ) VALUES (?,?, ?, ?, ?, ?)", [name, date, phone,sex, email, newDateDB], (err, result) => {

                    if (err) {

                        res.status(500).send(err);
                        console.log(err);
                        
                                                
                    } else {
                        res.status(200).send("Successfully");
                    }
                });
            }
        }
    })
});

// mostrar servicios en el select de react
app.get("/getServices",(req,res)=>{
    bd.query("SELECT NombreServicio,Codigo_Servicios,DuracionServicio FROM serviciosgenerales GROUP BY NombreServicio HAVING COUNT(*) = 1 ORDER by IdServiciosGenerales",(err,result)=>{
        if(err){
            res.status(500).send("Error")
        }
        else{
            return res.status(200).json(result);
        }
    })
})

// si el cliente ya agendo 2 veces la 3 se cobrara
app.get("/getDateUser", (req, res) => {
    const id = req.query.id;

    bd.query("SELECT * FROM agenda WHERE Clientes_IdClientes = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al buscar usuario" });
        }

        if (result.length >= 2) {
            return res.status(200).send("Ya no puedes agendar");
        }

        // Caso por defecto cuando result.length no es >= 2
        return res.status(200).json({ message: "Puedes agendar", citas: result });
    });
});

