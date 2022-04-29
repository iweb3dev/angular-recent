import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokensService } from '../user-session/tokens.service';
import { HttpOptions } from './http.models';

@Injectable({
  providedIn: 'root',
})
export class Http {
  constructor(
    private _httpClient: HttpClient,
    private _tokensService: TokensService,
  ) {}

  get<TResult>(url: string, options?: HttpOptions): Observable<TResult> {
    const getOptions = this.createHttpOptions(options);

    return this._httpClient.get<TResult>(
      `${environment.api.base}${url}`,
      getOptions,
    );
  }

  post<TResult, TBody = {}>(
    url: string,
    body: TBody,
    options?: HttpOptions,
  ): Observable<TResult> {
    const postOptions = this.createHttpOptions(options);

    return this._httpClient.post<TResult>(
      `${environment.api.base}${url}`,
      body,
      postOptions,
    );
  }

  put<TResult, TBody = {}>(
    url: string,
    body: TBody,
    options?: HttpOptions,
  ): Observable<TResult> {
    const putOptions = this.createHttpOptions(options);
    return this._httpClient.put<TResult>(
      `${environment.api.base}${url}`,
      body,
      putOptions,
    );
  }

  delete<TResult>(url: string, options?: HttpOptions): Observable<TResult> {
    const deleteOptions = this.createHttpOptions(options);

    return this._httpClient.delete<TResult>(
      `${environment.api.base}${url}`,
      deleteOptions,
    );
  }

  private createHttpOptions(options: HttpOptions): HttpOptions {
    const accessToken: string = this._tokensService.getAccessToken();

    return this.resolveHttpOptions(accessToken, options);
  }

  private resolveHttpOptions(
    accessToken: string,
    options: HttpOptions,
  ): HttpOptions {
    if (options) {
      if (!options.headers) {
        options.headers = new HttpHeaders();
      }
      options.headers = options.headers.append(
        `authorization`,
        `bearer ${accessToken}`,
      );
    } else {
      options = {};
      let requestHeaders = new HttpHeaders();
      requestHeaders = requestHeaders.set(
        `authorization`,
        `bearer ${accessToken}`,
      );
      options.headers = requestHeaders;
    }

    return options;
  }
}
