import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xoelgomez';
  showNavbar = false; // Inicialmente oculto
  showContent = false;

  onMatrixComplete() {
    this.showNavbar = true; // Se muestra al terminar la lluvia y el efecto de nombre
    this.showContent = true;

  }
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/es|gl|en/) ? browserLang : 'es');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
