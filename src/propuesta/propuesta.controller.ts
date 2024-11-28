/* eslint-disable prettier/prettier */
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
// import { PropuestaDto } from './propuesta.dto/propuesta.dto';
// import { PropuestaEntity } from './propuesta.entity/propuesta.entity';



@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor)

export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) { }

    // Get all propuestas 
    @Get()
    async findAll() {
        return await this.propuestaService.findAll();
    }

    
}
