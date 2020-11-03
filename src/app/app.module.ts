import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
