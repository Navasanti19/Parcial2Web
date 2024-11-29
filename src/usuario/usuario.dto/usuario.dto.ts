import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */

export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numCedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly grupoInvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numExtension: number;

    @IsString()
    @IsNotEmpty()
    readonly rol: string;

    @IsString()
    @IsNotEmpty()
    readonly idJefe: string;
}