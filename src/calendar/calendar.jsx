import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { FetchSelect, Schedules, SaveData,GetDataCalendar,ServicesSelect,FranchisesUSer,GetDateUSer,GetStatesFra } from "../apis/callApis";
import { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import "animate.css";
import LoadingPage from "../animation/animation";
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import Payment from "../pay/pay";
import "./index.css";


const MyCalendar = ({ dataUSer, setViews }) => {

  const [disabledS, setDisabledS] = useState(true);

  const [states, setStates] = useState([]); //arrays con los estados de las franquicias
  const [myFran, setMyFran] = useState("");
  const [full, setFull] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [viewCalendar, setViewCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [franchises, setFranchises] = useState([]);
  const [hoursFr, setHoursFr] = useState([]);
  const [lottie, setLottie] = useState(false);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledEst, setdisabledEst] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // Usar null para una sola selección
  const [durationService, setdurationService] = useState("60"); 
  const [selectState, setValueSelectState] = useState("");
  const [nullSelect, setNullSelect] = useState(
    "Seleccione servicio y franquicia para mostrar horarios disponibles..."
  );

  // aca ya tenemos el ID solo hacer una peticion y una nueva quuery para obetner el id de frasnquicia
  useEffect(() => {
    // console.log("aaaaaaaaaaaaaaa",dataUSer.id);
    
    //select de servicios
    ServicesSelect({setServices})

    //metodo para mostrar la franq que se agendo
    FranchisesUSer({dataUSer,setMyFran})

    //metodo para saber si ya agendo 2 > citas se le cobrara
    GetDateUSer({dataUSer:dataUSer.id,setFull})

    //metodo para llamar los estados de las franquicias en un select
    GetStatesFra({setStates})

  }, []);


  useEffect(() => {
     
    // if(myFran!==""){
    //   setdisabledEst(true)
    // }

    if (full !== "") {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${full}`,
      });
      setMyFran("")
      setDisabledS(true)
      setNullSelect("Sin horarios para mostrar...")
    }
  }, [full]);




  const clickEvent = (arg) => {
  
    const date = arg.event.startStr;
    const dateFullCalendar = date.slice(0, 10);

    const dateConvert = new Date(dateFullCalendar);
    const dateActu = new Date();

    const diferenciaEnDias = Math.floor((dateActu - dateConvert) / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias >= 2) {
      // alert("Han pasado 2 días desde la fecha especificada.");
      let swalOptions = {
          icon: "warning",
          title: "Cita sin confirmar",
          html: `<p>Servicio:</p> ${arg.event.title} <p> <br>Esta cita aun no está confirmada, favor de asistir o llamar para cancelar y poder agendar en otra sucursal😉</p>`,
          showDenyButton: true,
          denyButtonText: "Cancelar",
        
        };
      
    
        Swal.fire(swalOptions);
    }
    else{
      let swalOptions = {
        icon: "warning",
        title: "Cita sin confirmar",
        html: `<p>Servicio:</p> ${arg.event.title} <p> <br>Esta cita aun no está confirmada, favor de asistir o llamar para cancelar y poder agendar en otra sucursal😉</p>`,
        showCloseButton: true,
      };
    
  
      Swal.fire(swalOptions);
      // alert("Aun no pasan 2 dias");

    }


  };
  
  
  //evento de franquicias y evento de calendario al seleccionar franquicia
  const handleChange = (event) => {

    const valuepm = event.target.value;
    setValueSelect(valuepm);

    //horarios para fullCalendar
    Schedules({ valueSelect: valuepm, setHoursFr });

    //Obtener citas de la franquicia seleccionada
    GetDataCalendar({idFra:valuepm ,setEvents})
    // setDisabled(true)
    
    setLoading(true);
    setViewCalendar(false);
    setNullSelect("Cargando horarios...");

    //habilitar el select de servicios
    setDisabled(false)
  
    setInterval(() => {

      //mostrar calendario despues de 3 segundos
      setViewCalendar(true);
      //ocultamos el load
      setLoading(false);
    }, 3000);
  
  };

   //select de servicios 
   const handleChangeService = (event, newValue) => {
    console.log(newValue.duration);
    
    if(newValue.duration!==""){
      setdurationService(newValue.duration)
    }
    setSelectedService(newValue);
   


  };

  //select de estados
  const handleChangeState=(event,newValue)=>{
    const valueState = event.target.value;
    setValueSelectState(valueState);
    setDisabledS(false) //deshabilitar el select de franquicias    
    //metodo para el select de franquicias
    FetchSelect({ setFranchises,selectState: valueState});
    
  }


  // guardar citas nuevas
  const handleEventCreate = (arg) => {
    
    
    const start = arg.startStr.slice(0, 10);
    const end = arg.endStr.slice(0, 10);
    
    // const end = arg.endStr.slice(0, 10);
    // const hi = arg.startStr.slice(11);
    // const hf = arg.endStr.slice(11);



    const hi = arg.startStr.slice(11);
    const hf = arg.endStr.slice(11);
    
    const [hfHours, hfMinutes] = hf.split(":"); // Separar horas y minutos de la hora final
    const hfDate = new Date();
    hfDate.setHours(hfHours, hfMinutes); 
    
    // Sumar los minutos de duración de la sesión seleccionada por el usuario
    hfDate.setMinutes(hfDate.getMinutes() + parseInt(durationService));
    
    // Formatear la nueva hora final como hh:mm
    const newHf = hfDate.toTimeString().slice(0, 5);
    
    // Convertir la hora de inicio `hi` a un objeto Date (si necesitas hacer algo similar con la hora de inicio)
    const [hiHours, hiMinutes] = hi.split(":"); // Separar horas y minutos de la hora de inicio
    const hiDate = new Date();
    hiDate.setHours(hiHours, hiMinutes); 
    
    // Puedes utilizar `hiDate` para cualquier manipulación adicional que necesites
    const newHi = hiDate.toTimeString().slice(0, 5); // Formato de hora: hh:mm

    

    Swal.fire({
      html: `

         <p>Horario seleccionado:</p>
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="swal-input-hi" disabled value="${newHi}">
          <span class="input-group-text">-</span>
          <input type="text" class="form-control" id="swal-input-hf" disabled value="${newHf}">
        </div>

          <p>Fecha:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-date" disabled value="${start}">
        </div>

          <p>Duración:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-date" disabled value="${durationService} minutos">
        </div>
        
           <p>Nombre:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-name" disabled value="${dataUSer.name}">
        </div>

            <p>Correo:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-email"  disabled value="${dataUSer.email}">
        </div>

           <p>Numero:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-phone" disabled value="${dataUSer.phone}">
        </div>

      
      <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="swal-input-service"style="height: 100px; max-height:100px" disabled>${selectedService==null ? 'No selecciono servicio' : selectedService.name}</textarea>
          <label for="">Servicio seleccionado:</label>
      </div>
       `,
      icon: "success",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Crear cita",
      denyButtonText: `Cancelar`,
      title: "Crear cita",

      preConfirm: () => {
        const hi = Swal.getPopup().querySelector("#swal-input-hi").value;
        const hf = Swal.getPopup().querySelector("#swal-input-hf").value;
        const service = Swal.getPopup().querySelector("#swal-input-service").value;
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (service =="No selecciono servicio") {
          Swal.showValidationMessage(`No ha seleccionado un servicio, por favor cierre esta ventana y seleccione su servicio deseado`);
          return false;
        }
        // if (!emailPattern.test(email)) {
        //   Swal.showValidationMessage(`El correo electrónico no es válido.`);
        //   return false;
        // }
        return { service, hi, hf };
      },
    }).then(function (result) {
        setLoading(false)

      if (result.isConfirmed) {
        //mostrar animacion de carga
        
       setLottie(true)
       const { service, hi, hf } = result.value;
       // funcion para guardar
       SaveData({hi,hf,dateI:start,dateF:end,service,idFra: valueSelect,idUser: dataUSer.id,email:dataUSer.email,idServ:selectedService.id});
      //  console.log(hi,hf,arg.startStr,arg.endStr,service, valueSelect,idUser: dataUSer.id,email:dataUSer.email);
               
     
       {franchises.map((elemento) => {
           if (elemento.id == valueSelect) 
            {
              setTimeout(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Agendado en:" + elemento.name,
                  showConfirmButton: false,
                  timer: 1500,
                });
                setLottie(false)
                setViews(false)
              }, 5000);
           }
           
         });
       }

      }
    });
  };

  return (
    <>

    {lottie &&
           <LoadingPage/>
    }

    {!lottie &&

<div className="mt-2 container" style={{ background: "#b6b3df" }}>

      <div className="row">

        <div className="col-md-5 col-12 inputs">
        
        {myFran!="" ? <p className="textFran">Parece que tienes cita(s) en nuestra Sucursal de: <span className="resultText">{myFran[0].NombreFranquicia}</span> en el estado de <span className="resultText"> {myFran[0].Estado}</span> sin cofirmar por parte de nuestro personal</p> : <p></p>}
              <Box >
                
              <FormControl fullWidth>

                  <InputLabel id="demo-simple-select-label">
                    Seleccione un estado...
                  </InputLabel>          

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectState}
                    label="Estado"
                    onChange={handleChangeState}
                    disabled={disabledEst}
                    sx={{ width: 300 }}>

                {myFran!="" ? 
                  
                    <MenuItem key={myFran} value={myFran[0].IdFranquicias}>
                    {myFran[0].Estado}
                  </MenuItem> :
                
                  states.map((elemento,i) => (
                    <MenuItem key={i} value={elemento.state}>
                      {elemento.state}
                    </MenuItem>
                  ))  
                }

                   {
                   
                   }
                  </Select>

              </FormControl>

                {/* INPUT DE FRANQUICIAS */}

                <FormControl fullWidth>

                  <InputLabel id="demo-simple-select-label">
                    Seleccione una franquicia...
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valueSelect}
                    label="Age"
                    onChange={handleChange}
                    disabled={disabledS}
                    sx={{ width: 300 }}
                  >
                  
                  {myFran!="" ? 
                  
                    <MenuItem key={myFran} value={myFran[0].IdFranquicias}>
                    {myFran[0].NombreFranquicia}
                  </MenuItem> :
                  
                  franchises.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))
                  }
              
                  </Select>
                </FormControl> 


                    {/* INPUT DE SERVICIOS */}
                <FormControl fullWidth className="mt-4">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={services}
                    getOptionLabel={(option) => option.name} // mostrar el nombre del servicio
                    renderInput={(params) => <TextField {...params} label="Service" />}
                    value={selectedService} // Valor seleccionado actualmente
                    onChange={handleChangeService} // Manejar el cambio correctamente
                    disabled={disabled}
                    sx={{ width: 300 }}

                  />
                </FormControl>
              </Box>

          <div className="dataFr">
                  <div className="direcc">
                    <img src="images/ubi.png" alt="Model Art Spa" className="animate__animated animate__fadeInTopRight"/>
                    <p className="mt-3">Dirección: <span>CALLE ROMERO RUBIO 3B COL. LA PAZ</span></p>

                  </div>
            <p className="tel">Teléfono: <span>2222547071</span></p>
          </div>

        </div>
    

        <div className="col-md-6 col-12 calendar">
          {/* si viewCalendar es true mostrara el calendario*/}
          {viewCalendar && (
                <FullCalendar
                  initialView={"timeGridWeek"}
                  businessHours={[
                    {
                      daysOfWeek: [1],
                      startTime: hoursFr[0].hourML,
                      endTime: hoursFr[0].hourFL,
                    },
                    {
                      daysOfWeek: [2],
                      startTime: hoursFr[0].hourMM,
                      endTime: hoursFr[0].hourFM,
                    },
                    {
                      daysOfWeek: [3],
                      startTime: hoursFr[0].hourMMI,
                      endTime: hoursFr[0].hourFMI,
                    },
                    {
                      daysOfWeek: [4],
                      startTime: hoursFr[0].hourMJ,
                      endTime: hoursFr[0].hourFJ,
                    },
                    {
                      daysOfWeek: [5],
                      startTime: hoursFr[0].hourMV,
                      endTime: hoursFr[0].hourFV,
                    },
                    {
                      daysOfWeek: [6],
                      startTime: hoursFr[0].hourMS,
                      endTime: hoursFr[0].hourFS,
                    },
                    {
                      daysOfWeek: [0],
                      startTime: hoursFr[0].hourMD,
                      endTime: hoursFr[0].hourFD,
                    },
                  ]}
                  selectConstraint={"businessHours"}
                  height={500}
                  locale={"es"}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: "timeGridWeek",
                  }}
                  selectable={true}
                  selectAllow={(selectInfo) => {
                    const start = new Date(selectInfo.start); 
                    const end = new Date(selectInfo.end); 
                    const duration = (end - start) / (1000 * 60); 
                
                    return duration === 60; 
                  }}
                  buttonText={{
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    list: "Lista",
                  }}
                  select={handleEventCreate}
                  events={events}       
                  eventClick={clickEvent}
                />
              )}

                {/* si loading es true muestra el logo de carga */}
          {loading && (
            <section className="d-flex justify-content-center">
              <CircularProgress color="secondary" />
            </section>
          )}


          {/* si  viewCalendar es false mostrara un texto*/}
          {!viewCalendar && (
            <div className="divleyenda">
              <span style={{textAlign:"center"}}>{nullSelect}</span>
            </div>
          )}

          {full &&  <p className="text-center mt-4"><Button variant="outlined" onClick={Payment} startIcon={<PaymentIcon />}>Agendar cita</Button></p>}


        </div>
        
        
        
      </div>
</div>

}
    </>
  );
};

export default MyCalendar;
