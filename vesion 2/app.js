document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("file");
  const btnCargar = document.getElementById("btn-cargar");
  const resultado = document.getElementById("resultado");

  let archivoSeleccionado = null;

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

  // 🔹 Mostrar tokens y errores juntos
 // 🔹 Mostrar tokens y errores juntos
function mostrarResultados(tokens, errores) {
    let html = "";

    // 📌 Primero la tabla de tokens
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

    // 📌 Después la tabla de errores (si existen)
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
});
