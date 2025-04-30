
const runCommand = async( args: string[] ) => {

    // process.argv son los argumentos que ya se están enviando por consola
    // args son los argumentos que yo quiero enviar, los flags. Estoy armando un arreglo con todos
    process.argv = [ ...process.argv, ...args ];

    // Luego de enviar argumentos por consola es que puedo importar el yarg
    // En este momento ya tendrá data en sus options
    const { yarg } = await import ('../args.plugin');

    return yarg;
}


describe('Test args.plugin', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('Should return default values', async () => {

        // agrego argumentos por consola, agrego flag b
        const argv = await runCommand(['-b', '5']);

        console.log({ 
            Argumentos_consola: process.argv, 
            Yarg_options: argv 
        });

        expect( argv ).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: './outputs',
            })
        );
    });


    test('Should return congifuration with custom values', async () => {

        const argv = await runCommand(['-b', '3', '-l', '5', '-s', 'true']);

        console.log({ 
            Argumentos_consola: process.argv, 
            Yarg_options: argv 
        });

        expect( argv ).toEqual( expect.objectContaining({
            b: 3,
            l: 5,
            s: true,
            n: 'multiplication-table',
            d: './outputs',
            })
        );
    })
});