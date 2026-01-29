import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './presentation/components/footer/footer';
import { Navbar } from './presentation/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Footer,
    Navbar
  ],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Portfolio');
}
