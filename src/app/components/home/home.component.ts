import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showIntro = true;
  showBounce = false;
  contentVisible = false;

  ngOnInit(): void {
    // Activa el rebote muy rápido al cargar
    this.showBounce = true;

    // Espera a que el rebote termine y luego inicia fade out
    setTimeout(() => {
      this.showIntro = false;
      this.contentVisible = true;
    }, 1000); // Rebote + fade-out duración
  }
}