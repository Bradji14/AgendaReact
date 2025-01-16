import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./index.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MyCalendar from "../calendar/calendar";
import CircularProgress from "@mui/material/CircularProgress";
import Register from "../login/register";



const AccordionUsage = () => {
  const [errorUSer, seterrorUSer] = useState("");
  const [views, setViews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataUsers, setDataUser] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  //checar si el usuario existe y direccionar al calendario (login)
  const submit = handleSubmit((data) => {

    axios
      .post("http://localhost:3000/getData", {
        name: data.name,
        email: data.email,
        phone: data.phone
      })
      .then((r) => {

        if (r.status === 200) {
          setLoading(true);
          seterrorUSer("");

          r.data.map((t) => {
            console.log(t);
            
            const data={
              id:t.IdClientes,
              phone:t.TelefonoCliente,
              name:t.NombreCliente,
              email:t.CorreoCliente,
              
            }
            setDataUser(data);
          });

          setTimeout(() => {
            //quitamos el icono de carga
            setLoading(false);
            reset()
            setViews(true);
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.response) {
          seterrorUSer(error.response.data.message);
          console.log(error);
          
        } else {
          console.log("Ocurrió un error al enviar la solicitud.");
        }
      });
  });


  return (
    <div className="mt-5 d-flex justify-content-center cont">

      {/* <LoadingPage/> */}
      
      {/* si views es true mostrara el calendario y le pasamos el correo, nombre, numero y el ID del usuario */}
      {views && <MyCalendar dataUSer={dataUsers} setViews={setViews}/>}

      {/* siviews es false mostrara los inputs */}
      {!views && (
        <div className="col-md-8 options">
          <Accordion style={{background:"#b6b3df"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p>Soy cliente</p>
            </AccordionSummary>

            
            <AccordionDetails>
              <div className="d-flex justify-content-center">
                <div className="form">
                  <TextField
                    id="filled-basic"
                    label="Ingrese su nombre"
                    variant="filled"
                    style={{
                      marginBottom: "10px",
                      width: "400px",
                      borderColor: "white",
                    }}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "El campo es obligatorio",
                      },
                    })}
                  />

                  {errors.name && (
                    <span className="errors">{errors.name.message}</span>
                  )}

                  <TextField
                    id="filled-basic"
                    label="Ingrese su correo"
                    variant="filled"
                    style={{
                      marginBottom: "10px",
                      width: "400px",
                      borderColor: "white",
                    }}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "EL campo es obligatorio",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="errors">{errors.email.message}</span>
                  )}

                  <TextField
                    id="filled-basic"
                    label="Ingrese su numero"
                    variant="filled"
                    type="number"
                    style={{
                      marginBottom: "10px",
                      width: "400px",
                      borderColor: "white",
                    }}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "EL campo es obligatorio",
                      },
                      minLength: {
                        value: 10,
                        message: "Minimo 10 caracteres",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="errors">{errors.phone.message}</span>
                  )}
                  {errorUSer !== "" && (
                    <p className="errorsForm">{errorUSer}</p>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleSubmit(submit)}
                    style={{ background: "#6a1e74" }}
                  >
                    Ingresar
                  </Button>

                  {/* si loading es true mostrara el icono de carga */}
                  {loading && (
                    <section className="d-flex justify-content-center">
                      <CircularProgress color="secondary" />
                    </section>
                  )}

                </div>
              </div>
            </AccordionDetails>
          </Accordion>




          <Accordion style={{background:"#b6b3df"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <p>Soy usuario nuevo</p>
            </AccordionSummary>

            <AccordionDetails>

                  <Register/>

            </AccordionDetails>

          </Accordion>
        </div>
      )}
    </div>
  );
};
export default AccordionUsage;
