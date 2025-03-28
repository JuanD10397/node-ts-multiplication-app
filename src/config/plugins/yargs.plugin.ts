// yarg es una librería que sirve para trabajar con banderas que se colocan en la línea de comandos de la consola (-D -b)

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


// hideBin oculta el bin en el console.log futuro que hago en el app.ts
export const yarg = yargs( hideBin(process.argv) )
    // option es para especificar el funcionamiento del flag 'b'
    .option('b', {
        alias: 'base', // estoy llamando a b como base. Puedo usar ambos términos tanto como elemento de objeto como en consola. En consola llamo -b o --base
        type: 'number', // b será de tipo number
        demandOption: true, // es obligatorio que me proporcionen el flag b
        describe: 'Multiplication table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10, // valor por defecto cuando no es obligatorio
        describe: 'Multiplication table limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'File name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe: 'File destination'
    })
    // check es para especificar restricciones en las options
    .check(( argv, options) => {
        // console.log({argv, options});
        if ( argv.b < 1 ) // el valor del flag b debe ser mayor a 0
            throw 'Error: base must be greater than 0';

        return true;
    })
    .parseSync(); // Esto procesa los argumentos de la línea de comandos

