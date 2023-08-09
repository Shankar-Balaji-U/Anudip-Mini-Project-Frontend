import { NgModule, ComponentRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './page/home/home.component';

import { UserService } from './service/user.service';
import { MainComponent } from './layout/main/main.component';
import { UserRowComponent } from './layout/user-row/user-row.component';
import { UserComponent } from './page/user/user.component';
import { FileInputDirective } from './service/file-input.directive';
import { SetPasswordComponent } from './page/set-password/set-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    MainComponent,
    UserRowComponent,
    UserComponent,
    FileInputDirective,
    SetPasswordComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
