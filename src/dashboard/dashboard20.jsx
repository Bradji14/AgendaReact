import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import MySection from "../section/section";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import "./index.css";
import { FetchSelect,Schedules,SaveData,SaveClient } from "../apis/apis";


const Dashboard = () => {
  const [valueSelect, setValueSelect] = useState("");
  const [viewCalendar, setViewCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [franchises, setFranchises] = useState([]);
  const [hoursFr, setHoursFr] = useState([]);
  const [nullSelect, setNullSelect] = useState(
    "Seleccione una franquicia para mostrar horarios disponibles..."
  );
  

  useEffect(()=>{
    FetchSelect({setFranchises})
  },[])
  

  //funcion select
  const handleChange = (event) => {

    const valuepm=event.target.value    
    setValueSelect(valuepm)
    Schedules({ valueSelect: valuepm, setHoursFr });

    setLoading(true);
    setViewCalendar(false);
    setNullSelect("Cargando horarios...");

    setInterval(() => {
      //mostrar calendario despues de 3 segundos
      setViewCalendar(true);
      //ocultamos el load
      setLoading(false);

    },3000);
  };

    // guardar citas nuevas
  const handleEventCreate = (arg) => {
    const start = arg.startStr.slice(0, 10);
    const end = arg.endStr.slice(0, 10);

    const hi = arg.startStr.slice(11,19);
    const hf = arg.endStr.slice(11,19);
    console.log("save", hf);

    Swal.fire({
      html: `
       <p>Franquicia seleccionada:</p>
        <div class="mb-3 text-center">
        
          <input type="text" class="form-control text-center" id="swal-input-date" data-key="${valueSelect}"disabled>
        </div>

         <p>Horario seleccionado:</p>
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="swal-input-hi" disabled value="${hi}">
          <span class="input-group-text">-</span>
          <input type="text" class="form-control" id="swal-input-hf" disabled value="${hf}">
        </div>

          <p>Fecha:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-date" disabled value="${start}">
        </div>

        
           <p>Ingresa tu Nombre:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-name">
        </div>

            <p>Ingresa tu Correo:</p>
        <div class="mb-3 text-center">
          <input type="text" class="form-control text-center" id="swal-input-email">
        </div>

           <p>Ingresa tu Numero:</p>
        <div class="mb-3 text-center">
          <input type="number" class="form-control text-center" id="swal-input-phone">
        </div>
      
      <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="swal-input-service"style="height: 100px; max-height:100px"></textarea>
          <label for="">Cita:</label>
      </div>
       `
        ,        
      icon: "success",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      title: "Crear cita",

      preConfirm: () => {
        const hi = Swal.getPopup().querySelector('#swal-input-hi').value;
        const hf = Swal.getPopup().querySelector('#swal-input-hf').value;
        const date = Swal.getPopup().querySelector('#swal-input-date').value;
        const name = Swal.getPopup().querySelector('#swal-input-name').value;
        const email = Swal.getPopup().querySelector('#swal-input-email').value;
        const phone = Swal.getPopup().querySelector('#swal-input-phone').value;
        const service = Swal.getPopup().querySelector('#swal-input-service').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
        if (!name || !email || !phone || !service) {
          Swal.showValidationMessage(`Todos los campos son obligatorios.`);
          return false;
        }
        if (!emailPattern.test(email)) {
          Swal.showValidationMessage(`El correo electrónico no es válido.`);
          return false;
        }
        return  { name, email, phone, service,hi,hf,date }

      }
    }).then(function (result) {
      if (result.isConfirmed) {
        const { name, email, phone, service,hi,hf,date  } = result.value;
        console.log('Datos:', { name, email, phone, service});
        // SaveData({name,email,phone, service,hi,hf,date})
        SaveClient({name,phone,idFranq:valueSelect,email})
        {franchises.map(elemento =>
        {
          if(elemento.id==valueSelect){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Agendado en:"+elemento.name ,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
        )}       
          
      }
    });
  };


  return (
    <>
      <MySection />

     
    
      <div className="mt-5 d-flex justify-content-center sectionCalendar">

        <div className="col-md-2 select">
          
      
          <Box sx={{ minWidth: 100 }}>
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
              >
                {franchises.map((elemento) => (
                  
                      <MenuItem key={elemento.id} value={elemento.id}>{elemento.name}</MenuItem>        
                ))}               
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className="col-md-6 calendar">
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
              height={600}
              locale={"es"}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "timeGridWeek",
              }}
              selectable={true}
              buttonText={{
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                list: "Lista",
              }}
              select={handleEventCreate}

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
            <div className="">
              <p className="text-center">{nullSelect}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
