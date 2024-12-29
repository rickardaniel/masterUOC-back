import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewDTO } from './dto/news.dto';
import { News } from './news.entity';

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

    // @Get()
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
async findOne(@Query('id') id: string): Promise<News> {
    try {
        const news = await this.newService.findOne(id);
        if (!news) {
            throw new HttpException(
                'Noticia no encontrada',
                HttpStatus.NOT_FOUND
            );
        }
        return news;
    } catch (error) {
        console.error('Error:', error);
        throw new HttpException(
            'Error al procesar la consulta',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}

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
