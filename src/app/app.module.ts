import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers } from './reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
