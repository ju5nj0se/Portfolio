import { NgStyle } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { AsideNavbar } from './presentation/components/aside-navbar/aside-navbar';
import { About } from './presentation/sections/about/about';
import { Experience } from './presentation/sections/experience/experience';
import { Projects } from './presentation/sections/projects/projects';

@Component({
  selector: 'app-root',
  imports: [NgStyle, AsideNavbar, About, Experience, Projects],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Portfolio');

  mouseX = 0;
  mouseY = 0;
  scrollY = 0;
  isMobile = false;

  constructor() {
    this.checkMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY || document.documentElement.scrollTop;
  }

  checkMobile() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768; // Breakpoint común para tablets/móviles
    }
  }

  // Coordenadas calculadas para la "linterna"
  get spotlightX(): number {
    return this.isMobile && typeof window !== 'undefined' ? window.innerWidth / 2 : this.mouseX;
  }

  get spotlightY(): number {
    return this.isMobile && typeof window !== 'undefined' ? window.innerHeight / 2 : this.mouseY;
  }

  // Coordenada Y ajustada para la capa absoluta (incluye scroll)
  get maskY(): number {
    return this.spotlightY + (this.isMobile ? this.scrollY : this.scrollY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMobile) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
  }

  items = [
    { top: 15, left: 10, rotate: -6, src: 'eyes-images/eye.png' },
    { top: 25, left: 25, rotate: 4, src: 'eyes-images/eye2.png' },
    { top: 10, left: 60, rotate: -2, src: 'eyes-images/eye3.png' },
    { top: 40, left: 80, rotate: 8, src: 'eyes-images/eye4.png' },
    { top: 60, left: 15, rotate: -5, src: 'eyes-images/eye5.png' },
    { top: 50, left: 50, rotate: 3, src: 'eyes-images/eye6.png' },
    { top: 80, left: 30, rotate: -8, src: 'eyes-images/eye.png' },
    { top: 75, left: 70, rotate: 5, src: 'eyes-images/eye2.png' },
    { top: 30, left: 90, rotate: -4, src: 'eyes-images/eye3.png' },
    { top: 90, left: 10, rotate: 6, src: 'eyes-images/eye4.png' },
    { top: 15, left: 40, rotate: -3, src: 'eyes-images/eye5.png' },
    { top: 55, left: 95, rotate: 7, src: 'eyes-images/eye6.png' },
    { top: 35, left: 5, rotate: 12, src: 'eyes-images/eye.png' },
    { top: 85, left: 55, rotate: -10, src: 'eyes-images/eye2.png' },
  ];
}
