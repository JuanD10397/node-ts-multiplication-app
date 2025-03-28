import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";



// Ejemplo EJECUCIÓN EN CONSOLA: npx ts-node src/app --base 10 -l 5 -s --name tabla-5 -d ./outputs

(async() => {
    await main();
})();

async function main() {
    // console.log( yarg );
    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination} = yarg // tomo flags del yarg y paso como objeto al run()
    ServerApp.run({ base, limit, showTable, fileName, fileDestination});
}


//-------------------------------------------------
// BANDERAS Y ARGUMENTOS DE CONSOLA - YARG
//------------------------------------------------
// console.log(process.argv) // Me imprime en pantalla los comandos que se ejecutan en consola
// si coloco banderas (--version -D -b) en el momento de ejecución de consola también las muestra
// console.log( yarg ); // Con este yarg puedo acceder a los valores del argv como si fuera un objeto



// -----------------------------------------------------------------------------
// FUNCIONES ANÓNIMAS AUTONINVOCADAS 
// -----------------------------------------------------------------------------
// Se usan para ejecutar código asíncrono desde el root de la aplicación


// // FUNCIÓN ANÓNIMA AUTOINVOCADA
// (() => {
//     console.log('Función anónima autoinvocada');
// })();

// // FUNCIÓN ANÓNIMA AUTOINVOCADA ASÍNCRONA
// (async() => {
//     console.log('Función anónima autoinvocada Asíncrona');
// })();


