import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pipeFunction' })
export class PipeFunctionPipe implements PipeTransform {
  transform(value: unknown, handler: (value: unknown) => unknown): unknown {
    return handler(value);
  }
}
