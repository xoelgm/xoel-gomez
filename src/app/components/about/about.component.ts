import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  particles: { top: number; left: number; size: number; opacity: number }[] = [];

  ngOnInit(): void {
    this.generateParticles(50); // crea 50 partículas
  }

  generateParticles(count: number) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }
}