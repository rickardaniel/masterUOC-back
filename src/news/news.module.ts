import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';
import { SecurityMiddleware } from './security.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(SecurityMiddleware)
        .forRoutes('news');
}

}
