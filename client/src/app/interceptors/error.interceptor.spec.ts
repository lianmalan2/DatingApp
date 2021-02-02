import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error.interceptor';

    providers: [
      ErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
