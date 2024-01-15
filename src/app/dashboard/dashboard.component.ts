import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export interface PeriodicElement {
  name: string;
  total: number;
  co2kg: number;
  co2Per: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Alexander', total: 8, co2kg: 4, co2Per: '33.33' },
  { name: 'Joel Thomus', total: 6, co2kg: 3, co2Per: '21.25' },
  { name: 'Robert Nellson', total: 4, co2kg: 7, co2Per: '44.55' },
  { name: 'Curt Chirstman', total: 5, co2kg: 5, co2Per: '40.55' },
  { name: 'Wasley Johnson', total: 6, co2kg: 4, co2Per: '25.22' }
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  displayedColumns: string[] = ['Name', 'Total Hours', 'CO2 (Kg)', 'CO2 (%)', 'Action'];
  dataSource: any;
  public dateValue = new Date();
  constructor(public authService: AuthService) {
    if (authService.isAdmin) {
      this.dataSource = ELEMENT_DATA;
    } else {
      this.dataSource = [ELEMENT_DATA[0]];
    }
  }
  onDateChange(value: any) {
    console.log(value);
    console.log(this.dateValue);
  }
}
