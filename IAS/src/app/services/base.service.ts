import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class BaseService {
  private isRealApi: boolean = true;
  private apiPrefixReal: string = '/api/';
  private apiPrefixMock: string = 'http://localhost:2837/';

  protected apiPrefix: string = (this.isRealApi ? this.apiPrefixReal : this.apiPrefixMock);

  /**
   * Constructor
   * @param http
   */
  constructor(private readonly httpHandle: Http) {

  }

  /**
   * Returns alive-message.
   *
   * @returns {string}
   *
   * @memberOf SpeciesKeyDataService
   */
  alive(): string {
    return 'Service is alive!';
  }

  protected handleError(response: Response) {
      return Observable.throw(response.status);
  }

  protected logToConsole(response: Response) {
    return Observable.call(console.log(response.status));
  }

  /**
   * Get request options headers for JSON.
   *
   * @private
   * @returns {RequestOptionsArgs}
   *
   * @memberOf SpeciesKeyDataService
   */
  protected getRequestOptionsHeadersForJson(): Headers {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json charset=utf-8');
    headers.append('Accept', 'application/json');
    headers.append('culture', 'sv-SE');

    return headers;
  }

  /**
   * Add timestap to url to prevent casching
   * @param url
   */
  protected addTimeStamp(url: string): string {
    if (url.indexOf('?') === -1) {
      return url + '?ts=' + (Math.trunc(Date.now() / 1000));
    }

    return url + '&ts=' + (Math.trunc(Date.now() / 1000));
  }
}
