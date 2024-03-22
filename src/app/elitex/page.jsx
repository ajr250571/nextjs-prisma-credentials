"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

function ElitexPage() {
  const router = useRouter();

  const hoy = moment();
  const ayer = moment(hoy).subtract(1, "days");
  const fechaAyer = ayer.format("YYYY-MM-DD");

  const [fila, setFila] = useState("1");
  const [telar, setTelar] = useState("22");
  const [fecha, setFecha] = useState(fechaAyer);

  const [lecAnt1, setLecAnt1] = useState("");
  const [lecAnt2, setLecAnt2] = useState("");
  const [lecAnt3, setLecAnt3] = useState("");

  const [lecAct1, setLecAct1] = useState("");
  const [lecAct2, setLecAct2] = useState("");
  const [lecAct3, setLecAct3] = useState("");

  const [rend1, setRend1] = useState("");
  const [rend2, setRend2] = useState("");
  const [rend3, setRend3] = useState("");

  const [hrs1, setHrs1] = useState("8");
  const [hrs2, setHrs2] = useState("8");
  const [hrs3, setHrs3] = useState("8");

  const [ini1, setIni1] = useState("");
  const [ini2, setIni2] = useState("");
  const [ini3, setIni3] = useState("");

  const [rpm, setRpm] = useState("");
  const [reloj, setReloj] = useState("");

  const [fetchRPM, setFetchRPM] = useState("0");
  const [fetchLectura, setFetchLectura] = useState("0");

  const [error, setError] = useState("");

  useEffect(() => {
    // Función para realizar el fetch

    if (fila && telar && fecha) {
      if (fetchLectura === "1") {
        // console.log("Fetch lectura");
        const fetchLec1 = async () => {
          const res = await fetch("/api/getLectura", {
            method: "POST",
            body: JSON.stringify({
              fecha: new Date(fecha),
              reloj: 1,
              fila: parseInt(fila),
              telar: parseInt(telar),
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (res.ok) {
            if (data) {
              // console.log(data);
              setLecAnt1(data.lec_act);
            } else {
              setLecAnt1("");
            }
          } else {
            setLecAnt1("");
          }
          // console.log(lecAnt1);
          // ... procesar la respuesta del fetch
        };
        const fetchLec2 = async () => {
          const res = await fetch("/api/getLectura", {
            method: "POST",
            body: JSON.stringify({
              fecha: new Date(fecha),
              reloj: 2,
              fila: parseInt(fila),
              telar: parseInt(telar),
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (res.ok) {
            if (data) {
              // console.log(data);
              setLecAnt2(data.lec_act);
            } else {
              setLecAnt2("");
            }
          } else {
            setLecAnt2("");
          }
          // console.log(lecAnt2);
          // ... procesar la respuesta del fetch
        };
        const fetchLec3 = async () => {
          const res = await fetch("/api/getLectura", {
            method: "POST",
            body: JSON.stringify({
              fecha: new Date(fecha),
              reloj: 3,
              fila: parseInt(fila),
              telar: parseInt(telar),
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (res.ok) {
            if (data) {
              // console.log(data);
              setLecAnt3(data.lec_act);
            } else {
              setLecAnt3("");
            }
          } else {
            setLecAnt3("");
          }
          // console.log(lecAnt3);
          // ... procesar la respuesta del fetch
        };
        // Ejecutar el fetch cuando el valor del input cambia
        fetchLec1();
        fetchLec2();
        fetchLec3();
      }
      setFetchLectura("0");
    }

    if (fila && telar) {
      if (fetchRPM === "1") {
        // console.log("Fetch RPM");
        const fetchRpm = async () => {
          const res = await fetch("/api/rpm", {
            method: "POST",
            body: JSON.stringify({
              fila: parseInt(fila),
              telar: parseInt(telar),
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (res.ok) {
            if (data) {
              // console.log(data);
              setRpm(data.rpm);
            } else {
              setRpm("");
            }
          } else {
            setRpm("");
          }
          // ... procesar la respuesta del fetch
        };
        // Ejecutar el fetch cuando el valor del input cambia
        fetchRpm();
      }
      setFetchRPM("0");
    }

    if (lecAct1 && lecAnt1 && rpm && hrs1 && fecha && fila && telar) {
      const teor1 = (parseInt(rpm) * 60 * parseInt(hrs1)) / 100;
      var real1 = 0;
      if (ini1.toUpperCase() !== "I") {
        if (parseInt(lecAct1) >= parseInt(lecAnt1)) {
          real1 = parseInt(lecAct1) - parseInt(lecAnt1);
        } else {
          real1 = 99999 - parseInt(lecAnt1) + parseInt(lecAct1);
        }
      } else {
        real1 = 0;
      }
      const mRend1 = ((real1 / teor1) * 100).toFixed(1);
      if (mRend1 > 999) {
        setRend1(999);
      } else {
        setRend1(mRend1);
      }
    }
    if (lecAct2 && lecAnt2 && rpm && hrs2 && fecha && fila && telar) {
      const teor2 = (parseInt(rpm) * 60 * parseInt(hrs2)) / 100;
      var real2 = 0;
      if (ini2.toUpperCase() !== "I") {
        if (parseInt(lecAct2) >= parseInt(lecAnt2)) {
          real2 = parseInt(lecAct2) - parseInt(lecAnt2);
        } else {
          real2 = 99999 - parseInt(lecAnt2) + parseInt(lecAct2);
        }
      } else {
        real2 = 0;
      }
      const mRend2 = ((real2 / teor2) * 100).toFixed(1);
      if (mRend2 > 999) {
        setRend2(999);
      } else {
        setRend2(mRend2);
      }
    }
    if (lecAct3 && lecAnt3 && rpm && hrs3 && fecha && fila && telar) {
      const teor3 = (parseInt(rpm) * 60 * parseInt(hrs3)) / 100;
      var real3 = 0;
      if (ini3.toUpperCase() !== "I") {
        if (parseInt(lecAct3) >= parseInt(lecAnt3)) {
          real3 = parseInt(lecAct3) - parseInt(lecAnt3);
        } else {
          real3 = 99999 - parseInt(lecAnt3) + parseInt(lecAct3);
        }
      } else {
        real3 = 0;
      }
      const mRend3 = ((real3 / teor3) * 100).toFixed(1);
      if (mRend3 > 999) {
        setRend3(999);
      } else {
        setRend3(mRend3);
      }
    }
    if (
      parseInt(rend1) > 110 ||
      parseInt(rend2) > 110 ||
      parseInt(rend3) > 110
    ) {
      setError("El rendimiento no puede ser mayor que 110%");
    } else {
      setError("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reloj,
    fecha,
    fila,
    telar,
    lecAct1,
    lecAct2,
    lecAct3,
    hrs1,
    hrs2,
    hrs3,
    ini1,
    ini2,
    ini3,
    rend1,
    rend2,
    rend3,
  ]);

  const onSubmit = async (event) => {
    event.preventDefault();
    var lOk = true;
    if (
      parseInt(rend1) > 110 ||
      parseInt(rend2) > 110 ||
      parseInt(rend3) > 110
    ) {
      // alert("El Rend. no puede ser mayor a 110%.");
      lOk = false;
    }
    if ((hrs1 && !lecAct1) || (hrs2 && !lecAct2) || (hrs3 && !lecAct3)) {
      setError("Debe ingresar todas las Lecturas.");
      lOk = false;
    }

    if (lOk) {
      if (hrs1) {
        await fetch("/api/postLectura", {
          method: "POST",
          body: JSON.stringify({
            fecha: new Date(fecha),
            turno: 1,
            fila: parseInt(fila),
            telar: parseInt(telar),
            lec_act: parseInt(lecAct1),
            lec_ant: parseInt(lecAnt1),
            hrs: parseInt(hrs1),
            rpm: rpm,
            rend: parseFloat(rend1).toFixed(1),
            reloj: 1,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
      if (hrs2) {
        await fetch("/api/postLectura", {
          method: "POST",
          body: JSON.stringify({
            fecha: new Date(fecha),
            turno: 2,
            fila: parseInt(fila),
            telar: parseInt(telar),
            lec_act: parseInt(lecAct2),
            lec_ant: parseInt(lecAnt2),
            hrs: parseInt(hrs2),
            rpm: rpm,
            rend: parseFloat(rend2).toFixed(1),
            reloj: 2,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
      if (hrs3) {
        await fetch("/api/postLectura", {
          method: "POST",
          body: JSON.stringify({
            fecha: new Date(fecha),
            turno: 3,
            fila: parseInt(fila),
            telar: parseInt(telar),
            lec_act: parseInt(lecAct3),
            lec_ant: parseInt(lecAnt3),
            hrs: parseInt(hrs3),
            rpm: rpm,
            rend: parseFloat(rend3).toFixed(1),
            reloj: 3,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
      if (telar % 2 === 0) {
        // Es par
        var telAnt = telar;
        if (telar > 2) {
          setTelar(telAnt - 2);
        } else {
          setTelar(1);
        }
      } else {
        // Es impar
        var telAnt = telar;
        if (telar < 21) {
          setTelar(parseInt(telAnt) + 2);
        } else {
          var filaAnt = fila;
          setFila(parseInt(filaAnt) + 1);
          setTelar(22);
        }
      }

      setLecAct1("");
      setLecAct2("");
      setLecAct3("");

      setFetchRPM("1");
      setFetchLectura("1");

      // router.push("/elitex");
      //const resJson = await res.json();
      //console.log(resJson);
    } else {
      // alert("Rendimiento incorrecto.");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={onSubmit} className="w-full">
          <h1 className="text text-primary w-full bg-base-300 p-2 border-y-2 justify-center font-bold text-4xl flex items-center gap-2 mb-2">
            Elitex
          </h1>
          <div className="flex flex-row mb-2">
            <div className="w-1/4">
              <label className="label-text text-sm">Fila</label>
              <input
                type="number"
                className="input entrada"
                placeholder="1 al 7"
                value={fila}
                onChange={(e) => {
                  setFetchRPM("1");
                  setFetchLectura("1");
                  setFila(e.target.value);
                }}
              />
            </div>
            <div className="w-1/4">
              <label className="label-text text-sm">Telar</label>
              <input
                type="number"
                className="input entrada"
                placeholder="1 al 22"
                value={telar}
                onChange={(e) => {
                  setFetchRPM("1");
                  setFetchLectura("1");
                  setTelar(e.target.value);
                }}
              />
            </div>
            <div className="w-2/4">
              <label className="label-text text-sm">Fecha</label>
              <input
                type="date"
                className="input entrada"
                placeholder="Fecha"
                value={fecha}
                onChange={(e) => {
                  setFetchLectura("1");
                  setFecha(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="container grid my-1">
            <div className="flex flex-row gap-1 mb-1">
              <div className="w-1/12">
                <label className="text-center p-1">R</label>
              </div>
              <div className="w-1/12">
                <label className="text-center p-1">Hrs</label>
              </div>
              <div className="w-3/12">
                <label className="text-center p-1">Ant</label>
              </div>
              <div className="w-3/12">
                <label className="text-center p-1">Act</label>
              </div>
              <div className="w-3/12">
                <label className="text-center p-1">Rend</label>
              </div>
              <div className="w-1/12">
                <label className="text-center p-1">I</label>
              </div>
            </div>
            <div className="flex flex-row gap-1 mb-2 items-center">
              <div className="w-1/12">
                <label className="text-center p-1 texto">1</label>
              </div>
              <div className="w-1/12">
                <input
                  type="number"
                  className="input entrada"
                  value={hrs1}
                  onChange={(e) => setHrs1(e.target.value)}
                />
              </div>
              <div className="w-3/12">
                <label className="text-center align-middle p-1 texto">
                  {lecAnt1}
                </label>
              </div>
              <div className="w-3/12">
                <input
                  type="number"
                  className="input entrada"
                  value={lecAct1}
                  onChange={(e) => setLecAct1(e.target.value)}
                />
              </div>
              <div className="w-2/12">
                <label className="text-center p-1 texto">{rend1}</label>
              </div>
              <div className="w-1/12">
                <input
                  type="text"
                  className="input entrada"
                  value={ini1}
                  onChange={(e) => setIni1(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row  gap-1 mb-2  items-center">
              <div className="w-1/12">
                <label className="text-center p-1 texto">2</label>
              </div>
              <div className="w-1/12">
                <input
                  type="number"
                  className="input entrada"
                  value={hrs2}
                  onChange={(e) => setHrs2(e.target.value)}
                />
              </div>
              <div className="w-3/12">
                <label className="text-center align-middle p-1 texto">
                  {lecAnt2}
                </label>
              </div>
              <div className="w-3/12">
                <input
                  type="number"
                  className="input entrada"
                  value={lecAct2}
                  onChange={(e) => setLecAct2(e.target.value)}
                />
              </div>
              <div className="w-2/12">
                <label className="text-center p-1 texto">{rend2}</label>
              </div>
              <div className="w-1/12">
                <input
                  type="text"
                  className="input entrada"
                  value={ini2}
                  onChange={(e) => setIni2(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row  gap-1 mb-2  items-center">
              <div className="w-1/12">
                <label className="text-center p-1 texto">3</label>
              </div>
              <div className="w-1/12">
                <input
                  type="number"
                  className="input entrada"
                  value={hrs3}
                  onChange={(e) => setHrs3(e.target.value)}
                />
              </div>
              <div className="w-3/12">
                <label className="text-center align-middle p-1 texto">
                  {lecAnt3}
                </label>
              </div>
              <div className="w-3/12">
                <input
                  type="number"
                  className="input entrada"
                  value={lecAct3}
                  onChange={(e) => setLecAct3(e.target.value)}
                />
              </div>
              <div className="w-2/12">
                <label className="text-center p-1 texto">{rend3}</label>
              </div>
              <div className="w-1/12">
                <input
                  type="text"
                  className="input entrada"
                  value={ini3}
                  onChange={(e) => setIni3(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-2 w-full" type="submit">
            Grabar
          </button>
          {<p className="mt-2 text-error font-bold">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ElitexPage;
