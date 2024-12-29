import { Injectable } from '@nestjs/common';
import { News } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewDTO } from './dto/news.dto';

@Injectable()
export class NewsService {

    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
    ) {}

    // LISTAR TODAS LAS NOTICIAS
    async findAll(): Promise<News[]> {
        return await this.newsRepository.find({
            order: {
                datetime: 'DESC'
            }
        });
    } 

    // BUSCAR POR ID
    async findOne(id: number): Promise<News> {
        return await this.newsRepository.findOne({ 
            where: { id } 
        });
    }

    // BUSCAR POR ID - Versión vulnerable a Blind SQL
    // async findOne(id: any): Promise<News> {
    //     try {
    //         // Decodificamos el id antes de usarlo en la consulta
    //         const decodedId = decodeURIComponent(id);
    //         const query = `SELECT * FROM news WHERE id = ${decodedId}`;
    //         console.log('Query ejecutada:', query); // Para debug
    //         const result = await this.newsRepository.query(query);
    //         return result[0];
    //     } catch (error) {
    //         console.error('Error en consulta:', error);
    //         throw error;
    //     }
    // }

    // CREAR NOTICIAS
    async create(createNewsDto: CreateNewDTO): Promise<News> {
        const news = this.newsRepository.create(createNewsDto);
        return await this.newsRepository.save(news);
    }
    // ACTUALIZAR NOTICIAS
    getUpdateNews(){

    }
    // ELIMINAR NOTICIAS
    getDeleteNews(){

    }


}
