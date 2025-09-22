document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("file");
  const btnCargar = document.getElementById("btn-cargar");
  const btnReporte = document.getElementById("btn-reporte");
  const btnBracket = document.getElementById("btn-bracket");
  const resultado = document.getElementById("resultado");

  let archivoSeleccionado = null;
  let tablasGeneradas = false;
  let reporteBracket = "";
  let reporteEquipos = "";
  let reporteGoleadores = "";
  let reporteGeneral = "";

  // Seleccionar archivo
  fileInput.addEventListener("change", (event) => {
    archivoSeleccionado = event.target.files[0];
  });

  // Procesar archivo al dar clic en "Cargar Archivo"
  btnCargar.addEventListener("click", (event) => {
    event.preventDefault();
    if (!archivoSeleccionado) {
      alert("Primero selecciona un archivo con 'Analizar Torneo'");
      return;
    }
    procesarArchivo(archivoSeleccionado);
  });

  function procesarArchivo(archivo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contenido = e.target.result;
      window.contenidoArchivo = contenido; // 🔹 guardamos global

      try {
        const scanner = new Scanner(contenido);
        const tokens = scanner.obtenerTokens();
        const errores = scanner.obtenerErrores();

        mostrarResultados(tokens, errores);
      } catch (err) {
        console.error("Error al analizar:", err);
        mostrarErrores([{ descripcion: "No se pudo procesar el archivo.", linea: "-", columna: "-" }]);
      }
    };
    reader.readAsText(archivo);
  }

  function mostrarResultados(tokens, errores) {
    let html = "";

    if (tokens && tokens.length > 0) {
      html += `
        <table border="1" cellpadding="5" style="border-collapse: collapse; background-color: #000; color: #fff; border: 2px solid #fff; width: 90%; margin: 20px auto;">
          <tr style="background-color: #FFD700; color: black; border: 2px solid #fff;">
            <th>No.</th>
            <th>Lexema</th>
            <th>Tipo</th>
            <th>Línea</th>
            <th>Columna</th>
          </tr>
      `;
      tokens.forEach((tk, i) => {
        html += `<tr style="border: 1px solid #fff;">
          <td>${i + 1}</td>
          <td>${tk.lexema}</td>
          <td>${tk.tipo}</td>
          <td>${tk.linea}</td>
          <td>${tk.columna}</td>
        </tr>`;
      });
      html += "</table>";
    }

    if (errores && errores.length > 0) {
      html += `
        <table border="1" cellpadding="5" style="border-collapse: collapse; background-color: #000; color: #fff; border: 2px solid #fff; width: 90%; margin: 20px auto;">
          <tr style="background-color: #800080; color: #fff; border: 2px solid #fff;">
            <th>No.</th>
            <th>Descripción</th>
            <th>Línea</th>
            <th>Columna</th>
          </tr>
      `;
      errores.forEach((err, i) => {
        html += `<tr style="border: 1px solid #fff;">
          <td>${i + 1}</td>
          <td>${err.descripcion}</td>
          <td>${err.linea}</td>
          <td>${err.columna}</td>
        </tr>`;
      });
      html += "</table>";
    }

    resultado.innerHTML = html;
  }

  // 🔹 Mostrar solo errores si falla todo
  function mostrarErrores(errores) {
    let html = `
      <h2 style="text-align:center; color:red;">Errores encontrados</h2>
      <table border="1" cellpadding="5" style="border-collapse: collapse; background-color: #000; color: #fff; border: 2px solid #fff; width: 80%; margin: 20px auto;">
        <tr style="background-color: #800080; color: #fff; border: 2px solid #fff;">
          <th>No.</th>
          <th>Descripción</th>
          <th>Línea</th>
          <th>Columna</th>
        </tr>
    `;

    errores.forEach((err, i) => {
      html += `<tr style="border: 1px solid #fff;">
        <td>${i + 1}</td>
        <td>${err.descripcion}</td>
        <td>${err.linea}</td>
        <td>${err.columna}</td>
      </tr>`;
    });

    html += "</table>";
    resultado.innerHTML = html;
  }

  // 🔹 Generar Reporte
  btnReporte.addEventListener("click", (event) => {
    event.preventDefault();
    if (!window.contenidoArchivo) {
      alert("Primero carga un archivo.");
      return;
    }
    generarReportes(window.contenidoArchivo);
    tablasGeneradas = true;
    alert("✅ Se generaron las tablas correctamente");
  });

  // 🔹 Mostrar Brackets
  btnBracket.addEventListener("click", (event) => {
    event.preventDefault();
    if (!tablasGeneradas) {
      alert("Primero genera el reporte antes de mostrar el bracket.");
      return;
    }
    resultado.innerHTML = reporteBracket + reporteEquipos + reporteGoleadores + reporteGeneral;
  });

  //Función que genera los cuatro reportes dinámicos
  function generarReportes(contenido) {
    const scanner = new Scanner(contenido);
    const tokens = scanner.obtenerTokens();

    // --- Bracket ---
    let bracketRows = "";
    let fase = "";
    let partido = "";
    let resultadoPartido = "";
    let ganador = "";

    tokens.forEach((t, idx) => {
      if (["cuartos", "semifinal", "final"].includes(t.lexema.toLowerCase())) {
        fase = t.lexema;
      }
      if (t.lexema === "partido") {
        const equipo1 = tokens[idx + 2].lexema.replace(/"/g, "");
        const equipo2 = tokens[idx + 4].lexema.replace(/"/g, "");
        partido = `${equipo1} vs ${equipo2}`;
      }
      if (t.lexema === "resultado") {
        resultadoPartido = tokens[idx + 2].lexema.replace(/"/g, "");
        const [g1, g2] = resultadoPartido.split("-").map(Number);
        const eqs = partido.split(" vs ");
        ganador = g1 > g2 ? eqs[0] : eqs[1];
        bracketRows += `<tr><td>${fase}</td><td>${partido}</td><td>${resultadoPartido}</td><td>${ganador}</td></tr>`;
      }
    });

    reporteBracket = `
      <h2 style="text-align:center; margin-top:30px;">Reporte de Bracket de Eliminación</h2>
      <table border="1" style="border-collapse: collapse; margin:20px auto; color:white; font-size:18px; text-align:center; width:80%; border:2px solid white;">
        <tr style="background-color: #00bfff; color:black; font-weight:bold;">
          <th>Fase</th><th>Partido</th><th>Resultado</th><th>Ganador</th>
        </tr>
        ${bracketRows}
      </table>
    `;

    // --- Estadísticas por Equipo ---
    let equipos = {};
    tokens.forEach((t, idx) => {
      if (t.lexema === "resultado") {
        const equipo1 = tokens[idx - 4].lexema.replace(/"/g, "");
        const equipo2 = tokens[idx - 2].lexema.replace(/"/g, "");
        const res = tokens[idx + 2].lexema.replace(/"/g, "");
        const [g1, g2] = res.split("-").map(Number);

        if (!equipos[equipo1]) equipos[equipo1] = { J: 0, G: 0, P: 0, GF: 0, GC: 0 };
        if (!equipos[equipo2]) equipos[equipo2] = { J: 0, G: 0, P: 0, GF: 0, GC: 0 };

        equipos[equipo1].J++; equipos[equipo2].J++;
        equipos[equipo1].GF += g1; equipos[equipo1].GC += g2;
        equipos[equipo2].GF += g2; equipos[equipo2].GC += g1;

        if (g1 > g2) { equipos[equipo1].G++; equipos[equipo2].P++; }
        else { equipos[equipo2].G++; equipos[equipo1].P++; }
      }
    });

    let estadRows = "";
    Object.keys(equipos).forEach(eq => {
      const e = equipos[eq];
      estadRows += `<tr><td>${eq}</td><td>${e.J}</td><td>${e.G}</td><td>${e.P}</td><td>${e.GF}</td><td>${e.GC}</td><td>${e.GF - e.GC}</td></tr>`;
    });

    reporteEquipos = `
      <h2 style="text-align:center; margin-top:30px;">Reporte de Estadísticas por Equipo</h2>
      <table border="1" style="border-collapse: collapse; margin:20px auto; color:white; font-size:18px; text-align:center; width:80%; border:2px solid white;">
        <tr style="background-color: #ff69b4; color:black; font-weight:bold;">
          <th>Equipo</th><th>J</th><th>G</th><th>P</th><th>GF</th><th>GC</th><th>GD</th>
        </tr>
        ${estadRows}
      </table>
    `;

    // --- Goleadores ---
    let goleadores = {};
    tokens.forEach((t, idx) => {
      if (t.lexema === "goleador") {
        const jugador = tokens[idx + 2].lexema.replace(/"/g, "");
        if (!goleadores[jugador]) goleadores[jugador] = { goles: 0, minutos: [] };
        goleadores[jugador].goles++;
        if (tokens[idx + 4].lexema === "minuto") {
          goleadores[jugador].minutos.push(tokens[idx + 6].lexema);
        }
      }
    });

    let golRows = "";
    let pos = 1;
    Object.keys(goleadores).forEach(j => {
      const g = goleadores[j];
      golRows += `<tr><td>${pos++}</td><td>${j}</td><td>${g.goles}</td><td>${g.minutos.join(", ")}</td></tr>`;
    });

    reporteGoleadores = `
      <h2 style="text-align:center; margin-top:30px;">Reporte de Goleadores</h2>
      <table border="1" style="border-collapse: collapse; margin:20px auto; color:white; font-size:18px; text-align:center; width:80%; border:2px solid white;">
        <tr style="background-color: #ffd700; color:black; font-weight:bold;">
          <th>Posición</th><th>Jugador</th><th>Goles</th><th>Minutos</th>
        </tr>
        ${golRows}
      </table>
    `;

    // --- Información General del Torneo ---
    let nombreTorneo = "";
    let sedeTorneo = "";
    let equiposTorneo = 0;
    let totalPartidos = 0;
    let partidosCompletados = 0;
    let totalGoles = 0;
    let sumaEdades = 0;
    let totalJugadores = 0;
    let faseActual = "";

    tokens.forEach((t, idx) => {
      if (t.lexema.toLowerCase() === "nombre") {
        nombreTorneo = tokens[idx + 2].lexema.replace(/"/g, "");
      }
      if (t.lexema.toLowerCase() === "sede") {
        sedeTorneo = tokens[idx + 2].lexema.replace(/"/g, "");
      }
      if (t.lexema.toLowerCase() === "equipos") {
        equiposTorneo = parseInt(tokens[idx + 2].lexema);
      }
      if (t.lexema.toLowerCase() === "partido") {
        totalPartidos++;
      }
      if (t.lexema.toLowerCase() === "resultado") {
        partidosCompletados++;
        const res = tokens[idx + 2].lexema.replace(/"/g, "");
        const [g1, g2] = res.split("-").map(Number);
        totalGoles += g1 + g2;
      }
      if (t.lexema.toLowerCase() === "edad") {
        sumaEdades += parseInt(tokens[idx + 2].lexema);
        totalJugadores++;
      }
      if (["cuartos", "semifinal", "final"].includes(t.lexema.toLowerCase())) {
        faseActual = t.lexema;
      }
    });

    let promedioGoles = partidosCompletados > 0 ? (totalGoles / partidosCompletados).toFixed(2) : 0;
    let promedioEdad = totalJugadores > 0 ? (sumaEdades / totalJugadores).toFixed(2) : 0;

    reporteGeneral = `
      <h2 style="text-align:center; margin-top:30px;">Reporte de Información General del Torneo</h2>
      <table border="1" style="border-collapse: collapse; margin:20px auto; color:white; font-size:18px; text-align:center; width:70%; border:2px solid white;">
        <tr style="background-color: #32cd32; color:black; font-weight:bold;">
          <th>Estadística</th><th>Valor</th>
        </tr>
        <tr><td>Nombre del Torneo</td><td>${nombreTorneo}</td></tr>
        <tr><td>Sede</td><td>${sedeTorneo}</td></tr>
        <tr><td>Equipos Participantes</td><td>${equiposTorneo}</td></tr>
        <tr><td>Total de Partidos Programados</td><td>${totalPartidos}</td></tr>
        <tr><td>Partidos Completados</td><td>${partidosCompletados}</td></tr>
        <tr><td>Total de Goles</td><td>${totalGoles}</td></tr>
        <tr><td>Promedio de Goles por Partido</td><td>${promedioGoles}</td></tr>
        <tr><td>Edad Promedio de Jugadores</td><td>${promedioEdad} años</td></tr>
        <tr><td>Fase Actual</td><td>${faseActual}</td></tr>
      </table>
    `;
  }
});
