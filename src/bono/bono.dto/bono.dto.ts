/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class BonoDto {

    @IsNumber()
    @IsNotEmpty()
    readonly monto: number;

    @IsNumber()
    @IsNotEmpty()
    readonly calificacion: number;

    @IsString()
    @IsNotEmpty()
    readonly palabraClave: string;


}
