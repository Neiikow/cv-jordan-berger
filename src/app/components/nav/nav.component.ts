import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Inject(DOCUMENT) document: any;
  @HostListener('window:scroll', ['$event'])

  private onWindowScroll(e: any): any {
    const head = document.getElementById('head');
    if (window.pageYOffset > head.offsetHeight) {
      const element = document.getElementById('menu');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('menu');
      element.classList.remove('sticky');
    }
  }
}
