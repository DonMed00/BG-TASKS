import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  form = new FormControl('');
  result = ''
  maxDate: string; // today as maxDate of input

  constructor() {
    this.maxDate = new Date().toISOString().split('T')[0];
  }



  calculateAge() {
    const birthDate = new Date(this.form.value || new Date());
    const currentDate = new Date();
  
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    const weeks = Math.floor(days / 7);
    days %= 7;
  
    const hourDifference = currentDate.getHours() - birthDate.getHours();
    const minuteDifference = currentDate.getMinutes() - birthDate.getMinutes();
    const secondDifference = currentDate.getSeconds() - birthDate.getSeconds();
  
    this.result = `${years} years, ${months} months, ${weeks} weeks, ${days} days, ` +
                  `${hourDifference} hours, ${minuteDifference} minutes, ${secondDifference} seconds`;
  }
}
