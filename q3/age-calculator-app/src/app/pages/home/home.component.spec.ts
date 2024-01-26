import { HomeComponent } from './home.component';
import { FormControl } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let originalDate: DateConstructor;

  beforeEach(() => {
    originalDate = Date;

    // Mock the Date object
    const mockDate = new Date('2024-01-27 19:56:23');
    jasmine.clock().install();
    jasmine.clock().mockDate(mockDate);

    component = new HomeComponent();
    component.form = new FormControl('');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate correct age for a given date', () => {
    component.form.setValue('2023-01-10');
    component.calculateAge();
    const expectedAge = '1 years, 0 months, 2 weeks, 3 days, 18 hours, 56 minutes, 23 seconds';
    expect(component.result).toBe(expectedAge);
  });

  it('should calculate correct age for the same date', () => {
    component.form.setValue('2024-01-27');
    component.calculateAge();
    const expectedAge = '0 years, 0 months, 0 weeks, 0 days, 18 hours, 56 minutes, 23 seconds';
    expect(component.result).toBe(expectedAge);
  });
});

