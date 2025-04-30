import { CreateTable } from "../../domain/use-cases/create-table.use-case";
import { SaveFile } from "../../domain/use-cases/save-file.use-case";
import { ServerApp } from "../server-app";

describe("Server App", () => {

  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: 'test-filename',
    fileDestination: 'test-destination',
  };

  test("Should create ServerApp instance", () => {

    const serverApp = new ServerApp();
    expect( serverApp ).toBeInstanceOf(ServerApp);
    expect( typeof ServerApp.run ).toBe('function');

  });

  test("Should run ServerApp with default options", () => {

    // espía el método log de console (osea el console.log)
    const logSpy = jest.spyOn(console, 'log');

    // espía el método execute de la clase CreateTable (el prototype tiene los atributos y métodos de la clase)
    const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );

    ServerApp.run(options);

    // Espero que el console.log haya sido llamado 2 veces
    expect( logSpy ).toHaveBeenCalledTimes(2);
    expect( logSpy ).toHaveBeenCalledWith('Server running...');
    expect( logSpy ).toHaveBeenLastCalledWith('File created!');

    expect( createTableSpy ).toHaveBeenCalledTimes(1);
    expect( createTableSpy ).toHaveBeenCalledWith({
      base: options.base, limit: options.limit
    });

    expect( saveFileSpy ).toHaveBeenCalledTimes(1);
    expect( saveFileSpy ).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestinationPath: options.fileDestination,
      fileName: options.fileName
    });
  });

});
