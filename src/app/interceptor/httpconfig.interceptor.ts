import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor{

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = `${environment.backend_url}`;

        const authReq = req.clone({
            url: `${baseUrl + req.url}`
        });
        return next.handle(authReq);
    }
}

export const HttpConfigInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
};