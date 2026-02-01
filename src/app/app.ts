import { Component, signal } from '@angular/core';
import { Footer } from './presentation/components/footer/footer';
import { Navbar } from './presentation/components/navbar/navbar';
import { Home } from './presentation/sections/home/home';
import { AboutMe } from './presentation/sections/about-me/about-me';
import { Projects } from './presentation/sections/projects/projects';
import { Contact } from './presentation/sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [
    Footer,
    Navbar,
    Home,
    AboutMe,
    Projects,
    Contact
  ],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Portfolio');
}
