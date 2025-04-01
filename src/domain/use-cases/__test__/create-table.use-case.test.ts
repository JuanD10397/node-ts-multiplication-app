import { CreateTable } from "../create-table.use-case"

describe('CreateTableUseCase', () => {
     

    test('Should create table with default values', () => {

        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 });

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toContain( 'Tabla del 2');
        expect( table ).toContain('2 x 10 = 20');
    });

    test('Should create table with custom values', () => {

        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable();
        const table = createTable.execute(options);

        expect( table ).toContain( 'Tabla del 3');
    })
});