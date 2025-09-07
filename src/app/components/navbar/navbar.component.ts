import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { 
  menuOpen = false;
  currentLang: string;

  constructor(
    private translationService: TranslationService,
    private viewportScroller: ViewportScroller
  ) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  changeLang(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement?.value || 'es';
    this.translationService.changeLanguage(lang);
    this.currentLang = lang;
  }

  scrollToSection(sectionId: string): void {
    this.menuOpen = false; // Cierra menú móvil al hacer click
    this.viewportScroller.scrollToAnchor(sectionId); // Hace scroll a la sección
  }
}