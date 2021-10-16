import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * アプリケーション共通ログフィルタ実装
 */
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // eslint-disable-next-line prettier/prettier
    console.log(`${new Date().toISOString()} INFO Controller処理開始: ${context.getClass().name}#${context.getHandler().name}`);

    return next.handle().pipe(
      tap(() => {
        // eslint-disable-next-line prettier/prettier
        console.log(`${new Date().toISOString()} INFO Controller処理終了: ${context.getClass().name}#${context.getHandler().name}`);
      }),
    );
  }
}
