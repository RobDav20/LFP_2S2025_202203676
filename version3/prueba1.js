// prueba1.js
import fs from 'fs';
import { Scanner } from './analizis.js';  // Importa tu DFA

// Leer archivo entrada.txt
const datos = fs.readFileSync('entrada.txt', 'utf8');

// Crear el Scanner con los datos leídos
const scanner = new Scanner(datos);

// Obtener tokens
const tokens = scanner.recorrido_reservas();
const cadenas = scanner.cadenas_comillas();
const llaves = scanner.recorrido_llave();
const corchetes = scanner.apertuara_corchete();
const puntosycoma = scanner.puntosycomas_cierrestotal();
const dospuntos_coma = scanner.dospuntos_coma();

// Mostrar tokens en consola
console.log(tokens);
console.log(cadenas);
console.log(llaves);
console.log(corchetes);
console.log(puntosycoma);
console.log(dospuntos_coma);


// Escribir tokens en archivo salida.txt
const salida = [dospuntos_coma];
let contenidoSalida = '';
salida.forEach(token => {
    contenidoSalida += `Token: ${token.palabra || token.simbol}, Tipo: ${token.tipo}\n`;
});
fs.writeFileSync('salida.txt', contenidoSalida);    
console.log('Análisis completado. Revisa salida.txt para los resultados.');

// analizis.js  
