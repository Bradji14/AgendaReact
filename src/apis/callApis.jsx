import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


// const navigate=useNavigate()


//mostrar una franquicia en el select si aun no se confirma cita

export const FranchisesUSer=({dataUSer,setMyFran})=>{

  axios.get("http://localhost:3000/getfranchiseUser",{
    params:{
      idUser:dataUSer.id
    }
  }).then((r)=>{
    console.log(r.data!=""?r.data[0].Estado:"sin registro en franquicias");
    setMyFran(r.data)
    // console.log("her date",r.data);  
    
  })
  
}

// franquicias en select
export const FetchSelect=({setFranchises,selectState})=>{

  axios.get("http://localhost:3000/getfranchise", {
    params: { name: selectState }
  }).then((r) => {
    console.log("call api:",r);
    
      const allFranq = r.data.map((fr) => ({
        id: fr.IdFranquicias,
        name: fr.NombreFranquicia,
      }));
      setFranchises(allFranq);
  }).catch((error) => {
      console.error("Error al obtener franquicias:", error);
      setFranchises([]); 
  });
  
}

//estados en select
export const GetStatesFra=({setStates})=>{
  axios.get("http://localhost:3000/getStatesFran").then((r)=>{
    const alldata=r.data

    const allState = alldata.map((s) => ({
      state:s.Estado
    }))

    return setStates(allState)
  })
}

// servicios en select
export const ServicesSelect= async ({setServices})=>{
  await axios.get("http://localhost:3000/getServices").then((r)=>{
    const alldata=r.data
  
    const allServices = alldata.map((s) => ({
      id:s.Codigo_Servicios,
      name:s.NombreServicio,
      duration:s.DuracionServicio
    }))
    
    setServices(allServices)
  })
}


// horarios de FullCalendar
export const Schedules = async ({valueSelect,setHoursFr}) => {
    try {
      const response = await axios.get("http://localhost:3000/schedule", {
        params: {
          id: valueSelect,
        },
      });
  
      const data = response.data;
      const mapData = data.map((h) => ({
        idFranqu: h.IdFranquicias,
        hourML: h.horaIniLunes,
        hourFL: h.horaFinLunes,
        hourMM: h.horaIniMartes,
        hourFM: h.horaFinMartes,
        hourMMI: h.horaIniMiercoles,
        hourFMI: h.horaFinMiercoles,
        hourMJ: h.horaIniJueves,
        hourFJ: h.horaFinJueves,
        hourMV: h.horaIniViernes,
        hourFV: h.horaFinViernes,
        hourMS: h.horaIniSabado,
        hourFS: h.horaFinSabado,
        hourMD: h.horaIniDomingo,
        hourFD: h.horaFinDomingo,        
      }));
  
       setHoursFr(mapData);
      
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
 
// guardar citas
export const SaveData=({hi,hf,dateI,dateF,service,idFra,idUser,email,idServ})=>{

  axios.post("http://localhost:3000/saveCalendar", {
    HoraInicio: hi,
    HoraFin: hf,
    Fecha: dateI,
    fechaFinal:dateF,
    SP_Agendado: service,
    color:"#5d6770",
    idFra: idFra,
    idUser:idUser,
    email:email,
    idServ:idServ
  })
  .then((r) => {
    console.log(r);
  });

}

//obtener citas
export const GetDataCalendar = async ({idFra,setEvents}) => {

  function convertToISO(dateStr, horaI) {
    return `${dateStr}T${horaI}`;
  }
  


  try {
    await axios.get("http://localhost:3000/data",{
      params:{
        idFra:idFra
      },
    }).then((r) => {
      const data = r.data;
      const myevents = data.map((item) => ({
        id: item.IdAgenda,
        title: item.SP_Agendado,
        start: convertToISO(item.Fecha,item.HoraInicio),
        end: convertToISO(item.fechaFinal,item.HoraFin),
        color: item.color,
      }));
      console.log("aca",myevents);     
      setEvents(myevents);
    });

  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }

};


//guardar clientes 
export const SaveClient = async ({name,phone,email,sex,date,setSuccess,setErrorUSer}) => {

  await axios.post("http://localhost:3000/createUser", {
      name: name,
      phone:phone,
      email:email,
      sex:sex,
      date:date,
    })
    .then((r) => {

      if (r.status === 200) {
        // reset()
        setSuccess(true)
        setErrorUSer("");

        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario creado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          setSuccess(false)
        
        }, 3000);
        // navigate("/")
      }
      
    }).catch((error) => {
      if (error.response) {
        setSuccess(false)
        // seterrorUSer(error.response.data.message);
        setErrorUSer(error.response.data.message);

        
      } else {
        console.log("Ocurrió un error al enviar la solicitud.");
      }
    });

};

export const GetDateUSer=  ({dataUSer,setFull})=>{

  axios.get("http://localhost:3000/getDateUser", {
    params: {
        id: dataUSer
    }
}).then((r) => {
    if (r.data === "Ya no puedes agendar") {
        console.log("Usuario no puede agendar más citas.");
        setFull("Límite de citas alcanzados");
    }
}).catch((error) => {
    console.error("Error", error);
});
}