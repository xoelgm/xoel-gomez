import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  currentLang: string = 'es';

  experienceDates: {
    start: string;
    end: string;
    display: string;
    months: string;
  }[] = [
    { start: '2025-06', end: 'Actualmente', display: '', months: '' },  // Altia
    { start: '2023-09', end: '2024-01', display: '', months: '' }       // Novadigy
  ];

  private monthNames: any = {
    es: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    gl: ['Xan.', 'Feb.', 'Mar.', 'Abr.', 'Mai.', 'Xuñ.', 'Xul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dec.'],
    en: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'es';
    this.updateExperienceDates();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.updateExperienceDates();
    });
  }

  private updateExperienceDates(): void {
    this.experienceDates.forEach(exp => {
      exp.display = this.formatDateRange(exp.start, exp.end, this.currentLang);
      exp.months = this.calculateDuration(exp.start, exp.end, this.currentLang);
    });
  }

  private formatDateRange(start: string, end: string, lang: string): string {
    const startDate = new Date(start + '-01');
    const startMonth = this.monthNames[lang][startDate.getMonth()];
    const startYear = startDate.getFullYear();

    let endText = '';
    if (end === 'Actualmente') {
      endText = lang === 'en' ? 'Currently' : end;
    } else {
      const endDate = new Date(end + '-01');
      const endMonth = this.monthNames[lang][endDate.getMonth()];
      const endYear = endDate.getFullYear();
      endText = `${endMonth} ${endYear}`;
    }

    return `${startMonth} ${startYear} - ${endText}`;
  }

  private calculateDuration(start: string, end: string, lang: string): string {
    const startDate = new Date(start + '-01');
    let endDate: Date;

    if (end === 'Actualmente') {
      endDate = new Date();
    } else {
      endDate = new Date(end + '-01');
    }

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months += endDate.getMonth() - startDate.getMonth();
    months = months <= 0 ? 1 : months; // mínimo 1 mes

    const monthWord = this.getMonthWord(months, lang);

    return `(${months} ${monthWord})`;
  }

  private getMonthWord(months: number, lang: string): string {
    if (lang === 'es') {
      return months === 1 ? 'mes' : 'meses';
    } else if (lang === 'gl') {
      return months === 1 ? 'mes' : 'meses';
    } else { // en
      return months === 1 ? 'month' : 'months';
    }
  }
}