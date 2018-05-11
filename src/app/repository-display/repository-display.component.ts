import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GitSearch } from '../git-search';


@Component({
    selector: 'app-repository-display',
    templateUrl: './repository-display.component.html',
    styleUrls: ['./repository-display.component.css']
})

export class RepositoryDisplayComponent implements OnInit {
    @Input() searchResults: GitSearch
    @Input() favorites: Array<number>
    @Output() toggleFavorite = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

    onToggleFavorite = (item) => {
        return this.toggleFavorite.emit(item.id);
    }

    checkFavorite = (item) => {
        return this.favorites.indexOf(item.id) >= 0;
    }
}
