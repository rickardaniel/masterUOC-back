import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule,
            NewsModule,
            TypeOrmModule.forRoot({
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: '',
              database: 'bd_practica_uno',
              autoLoadEntities: true,
              synchronize: true,
            }),
          ],
  controllers: [],
  providers: [],
})
export class AppModule {}
