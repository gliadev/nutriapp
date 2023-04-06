import React, { useState, useEffect } from "react";

function PacientesList() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    fetch("/api/paciente")
      .then((res) => res.json())
      .then((data) => setPacientes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Lista de pacientes</h1>
      {pacientes.map((paciente) => (
        <div key={paciente._id}>
          <h2>Nombre:{paciente.nombre}</h2>
          <p>Edad: {paciente.edad}</p>
          <p>Altura: {paciente.altura}</p>
          <p>Peso: {paciente.peso}</p>
        </div>
      ))}
    </div>
  );
}

export default PacientesList;
