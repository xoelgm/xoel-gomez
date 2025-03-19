import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    const lang = browserLang && ['es', 'gl', 'en'].includes(browserLang) ? browserLang : 'es';
    this.translate.use(lang);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getCurrentLang(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}