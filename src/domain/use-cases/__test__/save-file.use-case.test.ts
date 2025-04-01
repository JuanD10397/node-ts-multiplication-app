import { SaveFile } from "../save-file.use-case";
import fs from 'fs';


describe('SaveFileUseCase', () => {

    // este options se tomará para todos los tests (excepto para el primero, ahí se sobreescribe)
    const options = {
        fileContent: 'custom test content',
        fileDestinationPath: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }

    // después de todos los tests
    afterAll(() => {
        // borrar recursivamente la carpeta outputs, para verificar que las pruebas sí están creando la carpeta y los archivos
        fs.rmSync('outputs', { recursive: true });
        fs.rmSync('custom-outputs', { recursive: true });
    });
     
    test('Should save file with default values', () => {

        
        const filePath = 'outputs/table.txt';

        // este options sobreescribe al que está arriba en el describe, solo para este test
        const options = {
            fileContent: 'test content'
        }

        const saveFile = new SaveFile();
        const result = saveFile.execute(options);

        // Reviso que se haya creado el archivo
        expect( typeof result ).toBe('boolean');
        expect( result ).toBe(true)

        // reviso que exista un archivo creado en esa ruta
        const fileExists = fs.existsSync(filePath);
        expect( fileExists ).toBe(true);
        // reviso que el contenido del archivo sea 'test content'
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        expect( fileContent ).toBe( options.fileContent );
    });

    test('Should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(`${options.fileDestinationPath}/${options.fileName}.txt`);
        const fileContent = fs.readFileSync(`${options.fileDestinationPath}/${options.fileName}.txt`, { encoding: 'utf-8' });
        
        // Reviso que se haya creado el archivo
        expect( result ).toBe(true);
        // reviso que exista un archivo creado en esa ruta
        expect( fileExists ).toBe(true); 
        // reviso que el contenido del archivo sea 'test content'
        expect( fileContent ).toBe( options.fileContent );    
        
        // borrar recursivamente la carpeta 'custom-outputs/file-destination'
        fs.rmSync(options.fileDestinationPath, { recursive: true });
    });

    test('Should return false if directory could not be created', () => {

        const saveFile = new SaveFile();

        // Creo un spy que espíe el método mkdirSync de fs. 
        // El mockImplementation sirve para sobreescribir la funcionalidad de ese método. Ahí lanzaré un error
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error( 'Error message test' ); }
        );

        // Al llamar el .execute internamente se está llamando el mkdirSync con la implementación del mockImplementartion
        const result = saveFile.execute(options); 
        expect( result ).toBe(false);

        mkdirSpy.mockRestore(); // limpio ese spy que creé y elimina el mockImplementation. Restaura funcionalidad original
    });
});