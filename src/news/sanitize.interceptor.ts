// sanitize.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                if (data && typeof data === 'object') {
                    // Eliminar propiedades sensibles o sanitizar datos
                    delete data.sensitive;
                    // Sanitizar strings si es necesario
                }
                return data;
            }),
        );
    }
}