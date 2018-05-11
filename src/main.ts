import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    console.log('prod mode');
    enableProdMode();
} else {
    console.log('dev mode');
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
