/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoEntity } from '../bono/bono.entity/bono.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepository: Repository<UsuarioEntity>;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    bonoRepository = module.get<Repository<BonoEntity>>(
      getRepositoryToken(BonoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    usuarioRepository.clear();
    usuarioList = [];
    for (let i = 0; i < 5; i++) {
      const bono = await bonoRepository.save({
        monto: faker.number.int({ min: 5, max: 100 }),
        calificacion: faker.number.float({ min: 5, max: 5 }),
        palabraClave: faker.word.words(1),
      });

      const usuario = await usuarioRepository.save({
        numCedula: faker.number.int({ min: 10, max: 999 }),
        nombre: faker.person.firstName(),
        grupoInvestigacion: i % 2 === 0 ? 'TICSW' : 'IMAGINE',
        numExtension: faker.number.int({ min: 1, max: 999 }),
        rol: i % 2 === 0 ? 'Profesor' : 'Decana',
        idJefe: faker.string.uuid(),
        bonos: [bono],
      });
      usuarioList.push(usuario);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearUsuario should throw an exception if the Profesor is not in a valid grupoInvestigacion', async () => {
    const usuario = new UsuarioEntity();
    usuario.rol = 'Profesor';
    usuario.grupoInvestigacion = 'INVALID_GROUP';
    usuario.numExtension = 12345678;

    await expect(service.crearUsuario(usuario)).rejects.toHaveProperty(
      'message',
      'The usuario is not in grupos Investigacion',
    );
  });

  it('crearUsuario should create a Profesor if in a valid grupoInvestigacion', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    storedUsuario.grupoInvestigacion = 'COMIT';
    const result = await service.crearUsuario(storedUsuario);
    expect(result).toBeDefined();
    expect(result.grupoInvestigacion).toEqual(storedUsuario.grupoInvestigacion);
  });

  it('crearUsuario should throw an exception if Decana has an invalid numExtension', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    storedUsuario.rol = 'Decana';
    storedUsuario.numExtension = 1234;
    await expect(service.crearUsuario(storedUsuario)).rejects.toHaveProperty(
      'message',
      'The usuario is not igual a 8 extension',
    );
  });

  it('crearUsuario should create a Decana if numExtension is valid (8 digits)', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[1];
    storedUsuario.numExtension = 12345678;

    const result = await service.crearUsuario(storedUsuario);
    expect(result).toBeDefined();
    expect(result.numExtension).toEqual(storedUsuario.numExtension);
  });

  it('findUsuarioById should return a usuario for a valid id', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    const usuario = await service.findUsuarioById(storedUsuario.id);

    expect(usuario).toBeDefined();
    expect(usuario.id).toEqual(storedUsuario.id);
  });

  it('findUsuarioById should throw an exception if usuario not found', async () => {
    const invalidId = 'invalid-id';
    await expect(service.findUsuarioById(invalidId)).rejects.toHaveProperty(
      'message',
      'The usuario with the given id was not found',
    );
  });

  it('eliminarUsuario should throw an exception if usuario is a Decana', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[1];
    await expect(
      service.eliminarUsuario(storedUsuario.id),
    ).rejects.toHaveProperty('message', 'The usuariois a Decana');
  });

  it('eliminarUsuario should throw an exception if usuario has bonos', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    await usuarioRepository.save(storedUsuario);

    await expect(
      service.eliminarUsuario(storedUsuario.id),
    ).rejects.toHaveProperty('message', 'The usuario has  bonos asociados');
  });

  it('eliminarUsuario should remove a usuario if valid and no bonos', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    storedUsuario.bonos = [];
    await usuarioRepository.save(storedUsuario);
    await service.eliminarUsuario(storedUsuario.id);
    const deletedUsuario = await usuarioRepository.findOne({
      where: { id: storedUsuario.id },
    });
    expect(deletedUsuario).toBeNull();
  });
});
