import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from "@mui/material/CircularProgress";
import { SaveClient } from "../apis/callApis";
const Register=()=>{

    const [sexUser, setSexUser] = useState('');
    const [success, setSuccess] = useState(false);
    const [errorUSer, setErrorUSer] = useState("");

  

    const handleChange = (event) => {
        setSexUser(event.target.value);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const submit = handleSubmit((data) => {       
        console.log(data);
        // funcion para guardar en BD
        SaveClient({name:data.name,phone:data.phone,email:data.email,sex:data.sex,date:data.date,setSuccess,setErrorUSer})
       
            
      })
      

    return(
        <div className="d-flex justify-content-center">

              <div className="form">
              {errorUSer !== "" && (
                    <p className="errorsForm">{errorUSer}</p>
                  )}
              <TextField
                  id="filled-basic"
                  label="Ingrese su nombre completo"
                  variant="filled"
                  style={{
                    marginBottom: "10px",
                    width: "400px",
                    borderColor: "white",
                  }}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "EL campo es obligatorio",
                    },
                  })}
                />
                {errors.name && (
                  <span className="errors">{errors.name.message}</span>
                )}

                <TextField
                  id="filled-basic"
                  label="Ingrese su numero"
                  variant="filled"
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

              <InputLabel id="demo-simple-select-label">Sexo:</InputLabel>
              <Select
              className="mb-2"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sexUser}
                {...register("sex",{
                    required:{
                        value:true,
                        message:"Seleccione un valor"
                    }
                })}
                label="Age"
                onChange={handleChange}
                >
                  <MenuItem value={"Masculino"}>Masculino</MenuItem>
                  <MenuItem value={"Femenino"}>Femenino</MenuItem>
                </Select>
                {errors.sex && (
                  <span className="errors">{errors.sex.message}</span>
                )}

              <InputLabel id="demo-simple-select-label">Fecha nacimiento:</InputLabel>

                <TextField
                  id="filled-basic"
                  variant="filled"
                  type="date"
                  style={{
                    marginBottom: "10px",
                    width: "400px",
                    borderColor: "white",
                  }}
                  {...register("date", {
                    required: {
                      value: true,
                      message: "EL campo es obligatorio",
                    },
                  })}
                />
                 {errors.date && (
                  <span className="errors">{errors.date.message}</span>
                )}

            

                  <Button
                    variant="contained"
                    onClick={handleSubmit(submit)}
                    style={{ background: "#6a1e74" }}
                  >
                    Registrar
                  </Button>
                    {success &&
                      <section className="d-flex justify-content-center mt-3">
                      <CircularProgress color="secondary" />
                      </section>
                    }
              </div>

             
        </div>
    )
}

export default Register