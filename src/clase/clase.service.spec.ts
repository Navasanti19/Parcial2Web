/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('ClaseService', () => {
  let service: ClaseService;
  let claseRepository: Repository<ClaseEntity>;
  let claseList: ClaseEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    claseRepository = module.get<Repository<ClaseEntity>>(
      getRepositoryToken(ClaseEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    claseRepository.clear();
    claseList = [];
    for (let i = 0; i < 5; i++) {
      const clase = await claseRepository.save({
        nombre: faker.person.firstName(),
        codigo: faker.string.sample(),
        creditos: faker.number.int({ min: 1, max: 999 }),
      });
      claseList.push(clase);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearClase should throw an exception if codigo is shorter than 10 characters', async () => {
    const clase = new ClaseEntity();
    clase.codigo = '123';
    clase.nombre = 'Clase corta';
    clase.creditos = 5;

    await expect(service.crearClase(clase)).rejects.toHaveProperty(
      'message',
      'The clase is menor que 10',
    );
  });

  it('crearClase should create a clase if the codigo is valid', async () => {
    const clase = new ClaseEntity();
    clase.codigo = 'CLASE123456';
    clase.nombre = 'Clase válida';
    clase.creditos = 5;

    const result = await service.crearClase(clase);
    expect(result).toBeDefined();
    expect(result.codigo).toEqual(clase.codigo);
  });

  it('findClaseById should return a clase for a valid id', async () => {
    const storedClase: ClaseEntity = claseList[0];
    const clase = await service.findClaseById(storedClase.id);

    expect(clase).toBeDefined();
    expect(clase.id).toEqual(storedClase.id);
  });

  it('findClaseById should throw an exception if clase not found', async () => {
    const invalidId = 'invalid-id';
    await expect(service.findClaseById(invalidId)).rejects.toHaveProperty(
      'message',
      'The clase with the given id was not found',
    );
  });

  it('crearClase should throw an exception if codigo is too short', async () => {
    const clase = new ClaseEntity();
    clase.codigo = '123';
    clase.nombre = 'Clase invalida';
    clase.creditos = 3;

    await expect(service.crearClase(clase)).rejects.toHaveProperty(
      'message',
      'The clase is menor que 10',
    );
  });
});
