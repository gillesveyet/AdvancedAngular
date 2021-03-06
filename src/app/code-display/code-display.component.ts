import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GitCodeSearch, Item } from '../git-code-search';

@Component({
    selector: 'app-code-display',
    templateUrl: './code-display.component.html',
    styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit {
    @Input() searchResults: GitCodeSearch;
    @Input() favorites: Array<number>
    @Output() toggleFavorite = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

    onToggleFavorite = (item: Item) => {
        return this.toggleFavorite.emit(item.repository.id);
    }

    checkFavorite = (item: Item) => {
        return this.favorites.indexOf(item.repository.id) >= 0;
    }
}
