import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import { UnifiedSearch } from '../unified-search';
import { UnifiedSearchService } from '../unified-search.service';

@Component({
    selector: 'app-git-search',
    templateUrl: './git-search.component.html',
    styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
    searchResults: UnifiedSearch;
    searchQuery: string;
    displayQuery: string;
    title: string;
    favorites: Array<number> = [];
    form: FormGroup;
    formControls = {};

    constructor(private UnifiedSearchService: UnifiedSearchService, private route: ActivatedRoute, private router: Router) {
        this.modelKeys.forEach((key) => {
            let validators = [];
            if (key === 'q') {
                validators.push(Validators.required);
            }
            if (key === 'stars') {
                validators.push(Validators.maxLength(4))
            }

            validators.push(this.noSpecialChars);

            this.formControls[key] = new FormControl(this.model[key], validators);
        });

        this.form = new FormGroup(this.formControls);
    }

    model = new AdvancedSearchModel('', '', '', null, null, '');
    modelKeys = Object.keys(this.model);

    noSpecialChars(c: FormControl) {
        let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

        return REGEXP.test(c.value) ? {
            validateEmail: {
                valid: false
            }
        } : null;
    }


    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.searchQuery = params.get('query');
            this.displayQuery = params.get('query');
            this.gitSearch();
        })
        this.route.data.subscribe((result) => {
            this.title = result.title
        });
    }

    toggleFavorite = (id) => {
        let index = this.favorites.indexOf(id);

        if (index >= 0)
            this.favorites.splice(index, 1);
        else
            this.favorites.push(id);

        console.log(`toggleFavorite id:${id} index:${index}  favorites:${this.favorites}`, this.favorites);
    }


    gitSearch = () => {
        this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe((response) => {
            console.log(response);
            this.searchResults = response;
        }, (error) => {
            alert("Error: " + error.statusText)
        })
    }

    sendQuery = () => {
        this.searchResults = null;
        let search: string = encodeURIComponent(this.form.value.q);
        let params: string = "";

        this.modelKeys.forEach((elem) => {
            if (elem === 'q') {
                return false;
            }
            if (this.form.value[elem]) {
                params += '+' + elem + ':' + encodeURIComponent(this.form.value[elem]);
            }
        });

        this.searchQuery = search;
        if (params !== '') {
            this.searchQuery = search + '+' + params;
        }

        this.displayQuery = this.searchQuery;
        this.gitSearch();
    }
}
