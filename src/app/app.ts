import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    ToastModule,
    RouterOutlet
  ],
  template: `
    <p-toast [breakpoints]="{'920px': {width: '100%', right: '0', left: '0'}}"></p-toast>
    <router-outlet></router-outlet>
  `
})
export class App { }
