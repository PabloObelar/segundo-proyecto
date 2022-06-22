import React, { useRef, useState } from "react";
import useFetch from "./useFetch";
import "./index.scss";

const App = () => {
  const cotizaciones = useFetch(
    "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
  );
  //vinculamos los campos useRef con input text y el select
  const valor = useRef();
  const select = useRef();
  const selectBlue = useRef();
  const valorBlue = useRef();
  //Se crean los estados

  const [resultado, setResultado] = useState();
  const [resultadoBlue, setResultadoBlue] = useState();

  const validar = () => {
    if (valor.current.value >= 0) {
      let venta = cotizaciones[0].casa.venta.replace(",", ".");
      let compra = cotizaciones[0].casa.compra.replace(",", ".");
      if (select.current.value === "1") {
        let operacion = (valor.current.value * venta).toFixed(2);
        setResultado(`U$D ${operacion}`);
      } else if (select.current.value === "2") {
        let operacion2 = (valor.current.value / compra).toFixed(2);
        setResultado(`AR$ ${operacion2}`);
      } else {
        const error = "ERROR EN DATOS";
        setResultado(error);
      }
    }
    document.getElementById("form").reset();
  };

  const validarBlue = () => {
    if (valorBlue.current.value >= 0) {
      let ventaBlue = cotizaciones[1].casa.venta.replace(",", ".");
      let compraBlue = cotizaciones[1].casa.compra.replace(",", ".");
      if (selectBlue.current.value === "3") {
        let operacion3 = (valorBlue.current.value * ventaBlue).toFixed(2);
        setResultadoBlue(`U$D Blue ${operacion3}`);
      } else if (selectBlue.current.value === "4") {
        let operacion4 = (valorBlue.current.value / compraBlue).toFixed(2);
        setResultadoBlue(`AR$ ${operacion4}`);
      } else {
        const error = "ERROR EN DATOS";
        setResultadoBlue(error);
      }
    }
    document.getElementById("form2").reset();
  };

  return (
    <>
      <div id="caja">
        <h1>Conversor de Pesos a Dólares</h1>
        <form id="form">
          <input
            type="number"
            placeholder="Ingrese un importe..."
            ref={valor}
          ></input>
          <select ref={select}>
            <option value="0">Elegir</option>
            <option value="1">Dolar oficial a pesos</option>
            <option value="2">Pesos a Dolar oficial</option>
          </select>
          <input
            className="btn"
            type="button"
            value="Convertir"
            onClick={validar}
          ></input>
        </form>
        <div id="respuesta">
          <p>
            <strong className={resultado === false ? "error" : null}>
              {resultado ? <span>Cambio a dolar oficial: </span> : null}{" "}
              {resultado}
            </strong>
          </p>
        </div>
      </div>
      <div id="caja2">
        <h1>Conversor de Pesos a Dolar blue</h1>
        <form id="form2">
          <input
            type="number"
            placeholder="Ingrese un importe..."
            ref={valorBlue}
          ></input>
          <select ref={selectBlue}>
            <option value="0">Elegir</option>
            <option value="3">Dolar Blue a pesos</option>
            <option value="4">Pesos a Dolar Blue</option>
          </select>
          <input
            className="btn-blue"
            type="button"
            value="Convertirblue"
            onClick={validarBlue}
          ></input>
        </form>
        <div id="respuesta2">
          <p>
            <strong className={resultadoBlue === false ? "error" : null}>
              {resultadoBlue ? <span>Cambio a blue: </span> : null}{" "}
              {resultadoBlue}
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};
export default App;
