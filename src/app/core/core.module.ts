import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataBase } from '../in-memory-database';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,

    // utilizado para interceptar as requisição via http
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase)
  ],
  exports: [
    // shared modules
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {}
