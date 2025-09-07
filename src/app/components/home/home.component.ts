import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() matrixComplete = new EventEmitter<void>();

  contentVisible = false;
  nameText = '';
  fullName = 'Xoel Gómez';
  showMatrixRain = true;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.startMatrixRain();
    }, 100);
  }

  startMatrixRain() {
  const canvas = this.canvasRef.nativeElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let fontSize = 16;
  if (window.innerWidth <= 640) { // móviles
    fontSize = 10; // más pequeño
  }
  const columns = Math.floor(canvas.width / fontSize);

  // Inicializamos drops con posiciones aleatorias verticales
  const drops: number[] = Array(columns)
    .fill(0)
    .map(() => Math.floor(Math.random() * canvas.height / fontSize));

  const interval = setInterval(() => {
    if (!this.showMatrixRain) {
      clearInterval(interval);
      this.contentVisible = true;
      this.startMatrixNameEffect(); // Empezar efecto nombre
      return;
    }

    // Fondo semi-transparente para efecto estela
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00bcd4';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }, 33);

  // Parar la lluvia tras X segundos
  setTimeout(() => {
      this.showMatrixRain = false;
      canvas.style.display = 'none';
      // Avisar al padre que la lluvia terminó
      this.matrixComplete.emit();
    }, 2000);
}

  startMatrixNameEffect() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const displayName = Array(this.fullName.length).fill('');
  const totalDuration = 10000; // segundos para completar el nombre
  const intervalTime = 70; // Paso cada 50ms
  const totalSteps = Math.ceil(totalDuration / intervalTime);
  let step = 0;

  const interval = setInterval(() => {
    for (let i = 0; i < this.fullName.length; i++) {
      if (displayName[i] !== this.fullName[i]) {
        const progress = step / totalSteps;
        if (Math.random() < progress) {
          displayName[i] = this.fullName[i]; // letra correcta
        } else if (this.fullName[i] !== ' ') {
          displayName[i] = chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
          displayName[i] = ' ';
        }
      }
    }

    this.nameText = displayName.join('');
    step++;

    if (step > totalSteps) {
      this.nameText = this.fullName;
      clearInterval(interval);
      this.matrixComplete.emit();
    }
  }, intervalTime);
}
}