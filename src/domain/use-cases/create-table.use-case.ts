//------INTERFACES---------------------------------

// reglas de negocio que la clase debe implementar
export interface ICreateTableUseCase {
    
    // debe tener método execute que recibe un CreateTableOptions y retorna string
    execute: ( options: ICreateTableOptions) => string; 
}

export interface ICreateTableOptions {
    base: number;
    limit?: number; //limit puede ser opcional
}

//------------------------------------------------------------------------

// Esta clase crea la tabla de multiplicación. Implementa interfaz
export class CreateTable implements ICreateTableUseCase {

    constructor(
        /**
         * DI - Dependency Injection
         */
    ){}

    // dentro del execute podré usar las dependencias que viene de fuera del archivo
    // como limit no es obligatorio, le coloco que si viene undefined que le coloque 10
    execute({ base, limit = 10 }: ICreateTableOptions){


        let outputMessage = `
===================================
        Tabla del ${ base }
===================================\n
`;

        for( let i = 1; i <= limit; i++ ){
            outputMessage += `${ base } x ${ i } = ${ i * base }\n`;
        };

        return outputMessage;
    }
}