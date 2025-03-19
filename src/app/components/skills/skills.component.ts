import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  currentSlide: number = 0;

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = 2;
    }
  }

  nextSlide() {
    if (this.currentSlide < 2) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }
}