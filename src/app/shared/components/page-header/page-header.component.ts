import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  // tslint:disable: no-input-rename
  @Input('page-title') pageTitle: string;
  @Input('show-button') showButton = true;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;

  constructor() {}

  ngOnInit() {}
}
