import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  currentSlide: number = 0;

  skills = [
    { name: 'Nmap', img: 'assets/nmap.png' },
    { name: 'Wireshark', img: 'assets/wireshark.png' },
    { name: 'BurpSuite', img: 'assets/burp_suite.png' },
    { name: 'Metasploit', img: 'assets/metasploit.png' },
    { name: 'HTML', img: 'assets/html.png' },
    { name: 'CSS', img: 'assets/css.png' },
    { name: 'JavaScript', img: 'assets/javascript.png' },
    { name: 'MySQL', img: 'assets/mysql.png' },
    { name: 'Java', img: 'assets/java.png' },
    { name: 'Python', img: 'assets/python.png' },
    { name: 'C++', img: 'assets/c.png' },
    { name: 'PHP', img: 'assets/php.png' }
  ];

  get skillGroups() {
    const groups = [];
    for (let i = 0; i < this.skills.length; i += 4) {
      groups.push(this.skills.slice(i, i + 4));
    }
    return groups;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.skillGroups.length - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide < this.skillGroups.length - 1 ? this.currentSlide + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}