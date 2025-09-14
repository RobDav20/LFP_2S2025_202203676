class Scanner {
    constructor(datos){
        this.datos = datos;
        this.posicion = 0; 
    }

    recorrido_reservas(){

        let Resevadas = [];
        let palabra = "";
        let cuate = this.datos;
        let inicio = cuate;
        let contador = 0;
        for(let i = 0; i < cuate.length; i++){
            // esto es para que no tome en cuenta las palabras dentro de comillas, y ni las comillas
            if (cuate[i] === '"') {
                i++; // saltar la primera comilla
                while (i < cuate.length && cuate[i] !== '"') {
                    i++; // saltar todos los caracteres dentro de las comillas
                }
            if (i < cuate.length && cuate[i] === '"') {
                i++; // saltar la comilla de cierre
            }
        }

            while (cuate.charCodeAt(i) >= 65 && cuate.charCodeAt(i) <= 90 || (cuate.charCodeAt(i) >= 97 && cuate.charCodeAt(i) <= 122 )){  

                if(cuate.charCodeAt(i) >= 65 && cuate.charCodeAt(i) <= 90){
                    palabra += cuate[i];
                    i++;
                    
                    if(cuate[i] === ' ' || cuate[i] === '\n' || cuate[i] === '\r' || cuate[i] === '\t' || cuate[i] === '{' || cuate[i] === ':' || cuate[i] === ';' || cuate[i] === ',' || cuate[i] === '}'){
                        let alamacen = {palabra: palabra, tipo: "Reservada"}
                        Resevadas.push(alamacen);
                        break;
                }

            }

                // esto es para que cuando encuentres saltos y todo eso, pare y que no siga concatenando
                if(cuate.charCodeAt(i) >= 97 && cuate.charCodeAt(i) <= 122){
                    palabra += cuate[i];
                    i++;

                    if(cuate[i] === ' ' || cuate[i] === '\n' || cuate[i] === '\r' || cuate[i] === '\t' || cuate[i] === '{' || cuate[i] === ':' || cuate[i] === ';' || cuate[i] === ',' || cuate[i] === '}'){
                        let alamacen = {palabra: palabra, tipo: "Atributo"}
                        Resevadas.push(alamacen);
                        break;
                }

            }
            
        }
            contador++; // contador cuando el while no se cumpla
            palabra = ""; // reiniciar la palabra

        }
        return Resevadas;
    }

    cadenas_comillas(){
        // --- TU CÓDIGO ORIGINAL ---
        let cadena = [];
        let palabra = "";
        let cuate = this.datos;
        let inicio = cuate;
        let contador = 0;
        // lo que hace este for es recorrer todo el archivo
        for(let i = 0; i < cuate.length; i++){
            if(cuate[i] === '"'){
                palabra += cuate[i];
                i++;
                while(cuate[i]){
                    palabra += cuate[i];
                    i++;
                    if(cuate[i] === '"'){
                        palabra += cuate[i];
                        let alamacen = {palabra: palabra, tipo: "Cadena"}
                        cadena.push(alamacen);
                        break;
                    } 
                }
                palabra = ""; // reiniciar la palabra
            } 
            contador++; // contador cuando el while no se cumpla     
}
return cadena;
}

    recorrido_llave(){
        // --- TU CÓDIGO ORIGINAL ---
        let llaves = [];
        let abre = "";
        let cierra = ""; 
        let cuate = this.datos;
        let inicio = cuate;
        let contador = 0;
        for(let i = 0; i < cuate.length; i++){
            if(cuate[i] === '{'){
                abre += cuate[i];
                let alamacen1 = {simbol: abre, tipo: "Llave Apertura"}
                llaves.push(alamacen1);
                abre = ""; // reiniciar la palabra
                i++;
                while(cuate[i] != '}'){
                    i++;
                }
                if(cuate[i] === '}'){
                    cierra += cuate[i];
                    let alamacen = {simbol: cierra, tipo: "Llave Cierre"}
                    llaves.push(alamacen);
                    cierra = ""; // reiniciar la palabra
                    i++;
                }else{console.log("Error: llave no cerrada, no hay cierre de llave");   
                }
                }
            }
            return llaves;
    }

    apertuara_corchete(){
        // --- TU CÓDIGO ORIGINAL ---
        let corchete = [];
        let apertura = "";
        let cierre = "";
        let cuate = this.datos;
        let inicio = cuate;
        let contador = 0;
        for(let i = 0; i < cuate.length; i++){
            if(cuate[i] === '['){
                apertura += cuate[i];
                let alamacen1 = {simbol: apertura, tipo: "Corchete Apertura"}
                corchete.push(alamacen1);
                apertura = ""; // reiniciar la palabra
                i++;
                while(cuate[i] != ']'){
                    i++;
                }
                if(cuate[i] === ']'){
                    cierre += cuate[i];
                    let alamacen = {simbol: cierre, tipo: "Corchete Cierre"}
                    corchete.push(alamacen);
                    cierre = ""; // reiniciar la palabra
                    i++;
                }
                else{
                    console.log("Error: corchete no cerrado, porfavor cierre la informacion con un corchete");
            }

            }

    }
     return corchete;
    }

    //para reconocer los puntos y comas despues de los cierres de llave y corchetes
    puntosycomas_cierrestotal() {
    let puntosycoma = [];
    let cuate = this.datos;

    for (let i = 0; i < cuate.length; i++) {
        if (cuate[i] === '}') {
            if (i + 1 < cuate.length && cuate[i + 1] === ';') {
                puntosycoma.push({ simbol: ';', tipo: "Punto y Coma de cierre de bloque" });
                i++; 
            }else {
                console.log("Error: Falta punto y coma después del cierre de llave");
            }
        }

        if (cuate[i] === ']') {
            if (i + 1 < cuate.length && cuate[i + 1] === ';') {
                puntosycoma.push({ simbol: ';', tipo: "Punto y Coma de cierre de contenido" });
                i++; 
            }
            else {
                console.log("Error: Falta punto y coma después del cierre de corchete");
            }
        }
    }

    return puntosycoma;
}

    dospuntos_coma(){
        // --- TU CÓDIGO ORIGINAL ---
        let dospuntos = [];
        let cuate = this.datos; 
        let prueba1 = "";  
        let prueba2 = ""; 
        for(let i = 0; i < cuate.length; i++){
            while(cuate.charCodeAt(i) >= 97 && cuate.charCodeAt(i) <= 122 || cuate[i] === '\n' || cuate[i] === '\r' || cuate[i] === '\t' || cuate[i] === ' ' || cuate[i] === '{' || cuate[i] === '}' || cuate[i] === ';' || cuate[i] === ']' || cuate[i] === '['){
                    i++;

                    if(cuate[i] === ':'){
                        prueba1 += cuate[i];
                        let alamacen = {simbol: prueba1, tipo: "Dos Puntos de un atributo"}
                        dospuntos.push(alamacen);
                        prueba1 = ""; // reiniciar la palabra
                        dospuntos.push(alamacen);
                        i++;
                    }

                    if (cuate[i] === '"') {
                        i++; // saltar la primera comilla
                        while (i < cuate.length && cuate[i] !== '"') {
                            i++; // saltar todos los caracteres dentro de las comillas
                        }
                    if (i < cuate.length && cuate[i] === '"') {
                        i++; // saltar la comilla de cierre
                        }
                    }
// eto me irve para detedctar cada una de las comas que hay en los atributos

                    if(cuate[i] === ','){
                        prueba2 += cuate[i];
                        let alamacen = {simbol: prueba2, tipo: "Coma de un atributo"}
                        dospuntos.push(alamacen);
                        prueba2 = "";
                        i++;
                }
            }

        }
        return dospuntos;
    }

    // ------------------- MÉTODOS NUEVOS (sin regex) -------------------

    obtenerTokens() {
        const tokens = [];
        const texto = this.datos;
        let i = 0;
        let linea = 1;
        let columna = 1;
        let contador = 0;

        while (i < texto.length) {
            const ch = texto[i];

            // manejar saltos de línea y espacios
            if (ch === '\n') {
                linea++;
                columna = 1;
                i++;
                continue;
            }
            if (ch === '\r') {
                i++;
                continue;
            }
            if (ch === ' ' || ch === '\t') {
                columna++;
                i++;
                continue;
            }

            if (ch === '"') {
                let startLine = linea;
                let startCol = columna;
                let lex = '"';
                i++; columna++;
                // copiar hasta la comilla de cierre o EOF
                while (i < texto.length && texto[i] !== '"') {
                    if (texto[i] === '\n') {
                        lex += texto[i];
                        linea++; columna = 1;
                        i++;
                        continue;
                    }
                    lex += texto[i];
                    i++; columna++;
                }
                if (i < texto.length && texto[i] === '"') {
                    lex += '"';
                    i++; columna++;
                }
                tokens.push({ lexema: lex, tipo: "Cadena", linea: startLine, columna: startCol });
                continue;
            }

            // 2) Llaves
            if (ch === '{') {
                tokens.push({ lexema: '{', tipo: "Llave Apertura", linea: linea, columna: columna });
                i++; columna++;
                continue;
            }
            if (ch === '}') {
                // registro cierre y si inmediato siguiente es ';' se agrega en errores/puntosycoma más abajo si quieres
                tokens.push({ lexema: '}', tipo: "Llave Cierre", linea: linea, columna: columna });
                // chequear punto y coma inmediato
                if (i + 1 < texto.length && texto[i+1] === ';') {
                    tokens.push({ lexema: ';', tipo: "Punto y Coma de cierre de bloque", linea: linea, columna: columna + 1 });
                    i += 2; columna += 2;
                } else {
                    i++; columna++;
                }
                continue;
            }

            // 3) Corchetes
            if (ch === '[') {
                tokens.push({ lexema: '[', tipo: "Corchete Apertura", linea: linea, columna: columna });
                i++; columna++;
                continue;
            }
            if (ch === ']') {
                tokens.push({ lexema: ']', tipo: "Corchete Cierre", linea: linea, columna: columna });
                if (i + 1 < texto.length && texto[i+1] === ';') {
                    tokens.push({ lexema: ';', tipo: "Punto y Coma de cierre de contenido", linea: linea, columna: columna + 1 });
                    i += 2; columna += 2;
                } else {
                    i++; columna++;
                }
                continue;
            }

            // 4) Dos puntos y comas (:) y comas (,)
            if (ch === ':') {
                tokens.push({ lexema: ':', tipo: "Dos Puntos de un atributo", linea: linea, columna: columna });
                i++; columna++;
                continue;
            }
            if (ch === ',') {
                tokens.push({ lexema: ',', tipo: "Coma de un atributo", linea: linea, columna: columna });
                i++; columna++;
                continue;
            }

            // 5) Letras (mayúsculas = Reservada, minúsculas = Atributo)
            const code = texto.charCodeAt(i);
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                let startLine = linea;
                let startCol = columna;
                let lex = '';
                // concatenar letras
                while (i < texto.length) {
                    const cc = texto.charCodeAt(i);
                    if ((cc >= 65 && cc <= 90) || (cc >= 97 && cc <= 122)) {
                        lex += texto[i];
                        i++; columna++;
                        continue;
                    }
                    break;
                }
                // determinar tipo por primera letra
                const first = lex[0];
                if (first && first >= 'A' && first <= 'Z') {
                    tokens.push({ lexema: lex, tipo: "Reservada", linea: startLine, columna: startCol });
                } else {
                    tokens.push({ lexema: lex, tipo: "Atributo", linea: startLine, columna: startCol });
                }
                continue;
            }

            // 6) Números (enteros)
            if (code >= 48 && code <= 57) {
                let startLine = linea;
                let startCol = columna;
                let lex = '';
                while (i < texto.length) {
                    const cc = texto.charCodeAt(i);
                    if (cc >= 48 && cc <= 57) {
                        lex += texto[i];
                        i++; columna++;
                    } else break;
                }
                tokens.push({ lexema: lex, tipo: "Numero", linea: startLine, columna: startCol });
                continue;
            }

            // 7) Punto y coma aislado (no después de } o ]) — si aparece directamente
            if (ch === ';') {
                tokens.push({ lexema: ';', tipo: "Punto y Coma", linea: linea, columna: columna });
                i++; columna++;
                continue;
            }

            // 8) Si llegamos aquí, carácter no reconocido -> lo marcamos como token de error (pero lo devolveremos en obtenerErrores)
            // Avanzamos para no bloquear el bucle
            tokens.push({ lexema: ch, tipo: "NoReconocido", linea: linea, columna: columna });
            i++; columna++;
        }

        return tokens;
    }

obtenerErrores() {
    const errores = [];
    const texto = this.datos.split("\n");

    let pila = []; // para llaves y corchetes
    let dentroCadena = false;

    // 📌 Palabras reservadas que NO deben exigir ":"
    const palabrasReservadas = ["TORNEO", "EQUIPOS", "ELIMINACION", "vs"];

    for (let i = 0; i < texto.length; i++) {
        const linea = texto[i];
        const numLinea = i + 1;

        for (let j = 0; j < linea.length; j++) {
            const ch = linea[j];

            // ---- comillas ----
            if (ch === '"') {
                dentroCadena = !dentroCadena; // abrir o cerrar cadena
            }

            if (!dentroCadena) {
                // ---- llaves y corchetes ----
                if (ch === '{' || ch === '[') {
                    pila.push({ simbolo: ch, linea: numLinea, columna: j + 1 });
                }
                if (ch === '}' || ch === ']') {
                    if (pila.length === 0) {
                        errores.push({
                            descripcion: `Cierre inesperado '${ch}'`,
                            linea: numLinea,
                            columna: j + 1
                        });
                    } else {
                        const ultimo = pila.pop();
                        if ((ultimo.simbolo === '{' && ch !== '}') || (ultimo.simbolo === '[' && ch !== ']')) {
                            errores.push({
                                descripcion: `Se abrió '${ultimo.simbolo}' en línea ${ultimo.linea} pero se cerró con '${ch}'`,
                                linea: numLinea,
                                columna: j + 1
                            });
                        }
                    }

                    // ---- punto y coma o coma después de } o ] ----
                    let resto = linea.slice(j + 1).trim();
                    if (resto.length > 0 && resto[0] !== ";" && resto[0] !== ",") {
                        errores.push({
                            descripcion: `Falta ';' o ',' después de cerrar con '${ch}'`,
                            linea: numLinea,
                            columna: j + 1
                        });
                    }
                }

                // ---- dos puntos después de atributos ----
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) { // posible palabra
                    let palabra = "";
                    let k = j;
                    while (k < linea.length && ((linea[k] >= 'a' && linea[k] <= 'z') || (linea[k] >= 'A' && linea[k] <= 'Z'))) {
                        palabra += linea[k];
                        k++;
                    }

                    if (palabra.length > 0) {
                        // 📌 solo validar si NO es reservada
                        if (!palabrasReservadas.includes(palabra)) {
                            let resto = linea.slice(k).trim();
                            if (resto.length === 0 || resto[0] !== ":") {
                                errores.push({
                                    descripcion: `Falta ':' después del atributo '${palabra}'`,
                                    linea: numLinea,
                                    columna: j + 1
                                });
                            }
                        }
                        j = k - 1;
                    }
                }
            }
        }
    }

    // si quedaron sin cerrar
    while (pila.length > 0) {
        const p = pila.pop();
        errores.push({
            descripcion: `Se abrió '${p.simbolo}' en línea ${p.linea} pero nunca se cerró`,
            linea: p.linea,
            columna: p.columna
        });
    }

    // si quedaron comillas abiertas
    if (dentroCadena) {
        errores.push({
            descripcion: `Cadena sin cerrar con comillas`,
            linea: texto.length,
            columna: texto[texto.length - 1].length
        });
    }

    return errores;
}

}

// 🔹 Exportar al navegador
window.Scanner = Scanner;