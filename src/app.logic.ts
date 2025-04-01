// HACE LO MISMO QUE app.ts PERO TODO ESTÁ EN ESTE ARCHIVO. 
// No sigue ninguna arquitectura ni diseño de software


import * as fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

// Ejemplo EJECUCIÓN EN CONSOLA: npx ts-node src/app.logic.ts --base 4 -l 7 -s

// console.log(yarg);
const { b:base, l:limit, s:showTable } = yarg;

let outputMessage = ''
const title = `
===================================
           Tabla del ${ base }
===================================\n
`;

for( let i = 1; i <= limit; i++ ){
    outputMessage += `${ base } x ${ i } = ${ i * base }\n`;
};

outputMessage = title + outputMessage;

if( showTable )
    console.log(outputMessage);

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true }); // crea la carpeta outputs y de forma recursiva (puede crear carpetas dentro de carpetas)
fs.writeFileSync(`${ outputPath }/tabla-${ base }.txt`, outputMessage);
console.log('Archivo creado');