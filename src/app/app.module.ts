import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    HttpClientModule,
    AppRoutingModule,
    // ShoppingListModule,  --- remove for lazy loading
    // AuthModule,  --- remove for lazy loading
    // RecipesModule,  --- remove for lazy loading
    // NotFoundModule, // for not found route, it should be imported below the other routes  --- remove for lazy loading
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
