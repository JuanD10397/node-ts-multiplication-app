import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

// creo interfaz que pasaré a método run. Para obligar a que cuando sea llamada reciba esos argumentos
interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

// Método que tendrá toda la lógica del servidor
export class ServerApp {

    // Método que indica cuando el servidor está corriendo
    // static es para que el método pueda llamarse sin necesitdad de tener una instancia de la clase
    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('Server running...');
        
        const table = new CreateTable().execute( { base, limit });
        const fileWasCreated = new SaveFile()
            .execute( { 
                fileContent: table,
                fileName: fileName,
                fileDestinationPath:  fileDestination
            } );

        if(showTable) 
            console.log(table);

        ( fileWasCreated )
            ? console.log('File created!')
            : console.error('File not created');
    }
}