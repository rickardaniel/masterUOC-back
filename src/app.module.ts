import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';

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
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              autoLoadEntities: true,
              synchronize: true,
              extra: {
                // Forzar el uso de prepared statements
                prepareSql: true
            }
            }),
          ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
      }),
  },
  ],
})
export class AppModule {}
