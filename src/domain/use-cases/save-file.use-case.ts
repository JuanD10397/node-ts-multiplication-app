import fs from 'fs';

export interface ISaveFileUseCase {
    execute:( options: IOptions ) => boolean;
}

export interface IOptions {
    fileContent: string;
    fileDestinationPath?: string;
    fileName?: string;
}

//------------------------------------------

export class SaveFile implements ISaveFileUseCase {

    constructor(
         /** Inyección de Dependencias
          * repository: StorageReposotory */
    ){}

    execute( { 
        fileContent, 
        fileDestinationPath = 'outputs', 
        fileName = 'table'
    }: IOptions ): boolean {

        try {
            fs.mkdirSync(fileDestinationPath, { recursive: true }); // crea la carpeta outputs y de forma recursiva (puede crear carpetas dentro de carpetas)
            fs.writeFileSync(`${ fileDestinationPath }/${ fileName }.txt`, fileContent);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }
}