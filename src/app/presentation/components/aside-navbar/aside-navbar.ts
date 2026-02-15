import { Component } from '@angular/core';
import { ContactRedSocials } from '../contact-red-socials/contact-red-socials';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-aside-navbar',
  imports: [ContactRedSocials, NgClass],
  templateUrl: './aside-navbar.html',
})
export class AsideNavbar {
  sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
  ];

  activeSection = 'about';

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
