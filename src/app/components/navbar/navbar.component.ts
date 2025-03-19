import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentLang: string;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  changeLang(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement?.value || 'es';
    this.translationService.changeLanguage(lang);
    this.currentLang = lang;
  }
  
}
