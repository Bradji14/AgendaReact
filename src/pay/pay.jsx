import Swal from "sweetalert2";

const Payment=()=>{

    return (
        Swal.fire({
            html: `
      
            <label>Para volver a agendar se requiere de un costo de: <p>$ 200.00</p></label>
          
            <br>
          
            <p>Tipo de tarjeta</p>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1">
                    Credito
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1">
                    Debito
                </label>
            </div>

            <br>

               <p>Datos de Tarjeta</p>
              <div class="input-group mb-3">
                <input type="number" class="form-control" id="swal-input-hi" placeholder="XXX-XXX-XXX-XXXX">
                <span class="input-group-text">-</span>
                <input type="number" class="form-control" id="swal-input-hf" placeholder="CV">
              </div>

               <p>Fecha de Vencimiento</p>
              <div class="input-group mb-3">
                <input type="number" class="form-control" id="swal-input-hi" placeholder="Mes">
                <span class="input-group-text">/</span>
                <input type="number" class="form-control" id="swal-input-hf" placeholder="Año">
              </div>
             `,
            icon: "success",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Agendar",
            denyButtonText: `Cancelar`,
            title: "Model Art Spa",
      
          
          }).then(function (result) {

          })
    )

}
export default Payment;