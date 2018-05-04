import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GitCodeSearchService } from './git-code-search.service';
import { GitSearchService } from './git-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NoSpecialCharsDirective } from './no-special-chars.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnifiedSearchService } from './unified-search.service';

const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'search',
        redirectTo: '/search/angular',
        pathMatch: 'full'
    },
    {
        path: 'search/:query',
        component: GitSearchComponent,
        data: { title: 'Git Search' }
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        GitSearchComponent,
        HomePageComponent,
        NotFoundComponent,
        NoSpecialCharsDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            appRoutes
        )
    ],
    providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
    bootstrap: [AppComponent]
})
export class AppModule { }
