import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GitCodeSearchService } from './git-code-search.service';
import { GitSearchService } from './git-search.service';
import { UnifiedSearch } from './unified-search';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { GitSearch } from './git-search';
import { GitCodeSearch } from './git-code-search';

@Injectable()
export class UnifiedSearchService {

    constructor(private searchService: GitSearchService, private codeSearchService: GitCodeSearchService) { }

    unifiedSearch(query: string): Observable<UnifiedSearch> {


        return Observable.forkJoin(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query))
            .map((response: [GitSearch, GitCodeSearch]) => {
                return {
                    repositories: response[0],
                    code: response[1]
                }
            });

    }

}
