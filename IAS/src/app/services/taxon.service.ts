import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { BaseService } from './base.service';

import { Taxon } from '../models';

/**
 * Taxon related service
 */
@Injectable()
export class TaxonService extends BaseService {
  private controller = this.apiPrefix + 'taxa';

  constructor(private http: Http) {
    super(http);
  }

  /**
     * Search for taxon by id or name
     * @param match - string to match
     */
  searchTaxaAsync(match: string): Observable<Taxon[]> {
    return this.http.get(`${this.controller}?match=${match}`,
        { headers: this.getRequestOptionsHeadersForJson() })
      .map((res: Response) => res.json() as Taxon[])
      .catch(this.handleError);
  }
}
