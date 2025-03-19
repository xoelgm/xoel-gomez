import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  sendEmail(contactForm: NgForm) {
    if (contactForm.valid) {
      const formValues = {
        name: contactForm.value.name,
        email: contactForm.value.email,
        message: contactForm.value.message
      };

      const userID = '3MHC4Mzbx9dRGspgO';

      emailjs.send('service_ax0uut2', 'template_q812nyr', formValues, userID)
        .then((response) => {
          console.log('Correo enviado con éxito:', response);
          alert('¡Mensaje enviado con éxito!');
          contactForm.reset();
        }, (error) => {
          console.log('Error al enviar el correo:', error);
          alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
