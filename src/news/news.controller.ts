import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewDTO } from './dto/news.dto';
import { News } from './news.entity';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { SanitizeInterceptor } from './sanitize.interceptor';

// DTO para validación
class GetNewsDto {
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    @Max(999999) // Ajusta según tus necesidades
    id: number;
}
@UseInterceptors(SanitizeInterceptor)
@Controller('news')
export class NewsController {   

    constructor
    (
        private newService: NewsService
    )
    {
    }
    @Get('findAll')
    async findAll(): Promise<News[]> {
        return await this.newService.findAll();
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<News> {
    //     const news = await this.newService.findOne(+id);
    //     if (!news) {
    //         throw new HttpException(
    //             'Noticia no encontrada',
    //             HttpStatus.NOT_FOUND
    //         );
    //     }
    //     return news;
    // }

    @Get()
    // async findOne(
    //     @Query(new ValidationPipe({ 
    //         transform: true,
    //         forbidNonWhitelisted: true,
    //         whitelist: true
    //     })) query: GetNewsDto
    // ): Promise<News> {
    //     try {
    //         const news = await this.newService.findOne(query.id);
            
    //         if (!news) {
    //             throw new HttpException(
    //                 'Noticia no encontrada',
    //                 HttpStatus.NOT_FOUND
    //             );
    //         }

    //         return news;
    //     } catch (error) {
    //         if (error instanceof HttpException) {
    //             throw error;
    //         }
    //         throw new HttpException(
    //             'Error al procesar la solicitud',
    //             HttpStatus.BAD_REQUEST
    //         );
    //     }
    // }
    async findOne(
        @Query(new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true }
        })) query: GetNewsDto
    ) {
        // Conversión explícita a número
        const id = parseInt(String(query.id), 10);
        
        // Validación adicional
        if (isNaN(id) || id < 1) {
            throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
        }

        const news = await this.newService.findOne(id);
        
        if (!news) {
            throw new HttpException('Noticia no encontrada', HttpStatus.NOT_FOUND);
        }

        return news;
    }


    // async findOne(
    //     @Query('id', ParseIntPipe) id: number
    // ): Promise<News> {
    //     // Validación adicional
    //     if (id <= 0) {
    //         throw new HttpException(
    //             'ID inválido',
    //             HttpStatus.BAD_REQUEST
    //         );
    //     }

    //     const news = await this.newService.findOne(id);
    //     if (!news) {
    //         throw new HttpException(
    //             'Noticia no encontrada',
    //             HttpStatus.NOT_FOUND
    //         );
    //     }
    //     return news;
    // }
    // async findOne(@Query('id') id: string): Promise<News> {
    //     const news = await this.newService.findOne(+id);
    //     if (!news) {
    //         throw new HttpException(
    //             'Noticia no encontrada',
    //             HttpStatus.NOT_FOUND
    //         );
    //     }    
    //     return news;
    // }

    @Get()
// async findOne(@Query('id') id: string): Promise<News> {
//     try {
//         const news = await this.newService.findOne(id);
//         if (!news) {
//             throw new HttpException(
//                 'Noticia no encontrada',
//                 HttpStatus.NOT_FOUND
//             );
//         }
//         return news;
//     } catch (error) {
//         console.error('Error:', error);
//         throw new HttpException(
//             'Error al procesar la consulta',
//             HttpStatus.INTERNAL_SERVER_ERROR
//         );
//     }
// }

    @Post()
    async create(@Body() createNewsDto: CreateNewDTO): Promise<News> {
        try {
            return await this.newService.create(createNewsDto);
        } catch (error) {
            throw new HttpException(
                'Error al crear la noticia',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
