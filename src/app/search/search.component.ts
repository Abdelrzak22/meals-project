import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meel } from '../meel';
import { MeelsService } from '../services/meels.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  categories: string[] = [
    'All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat',
    'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood',
    'Side', 'Starter', 'Vegan', 'Vegetarian'
  ];

  datalist: Meel[] = []; 
  selectedCategory: string = 'All'; // ✅ Single variable for both button & dropdown

  constructor(private data: MeelsService) {}

  ngOnInit(): void {
    this.getdata();
  }

  onButtonClick(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.getdata();
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    console.log('Selected Category:', this.selectedCategory);
    this.getdata();
  }

  getdata() {
    console.log('Fetching data for:', this.selectedCategory);
    this.data.getmeels(this.selectedCategory).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.datalist = res && res.meals ? res.meals : [];
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.datalist = [];
      }
    });
  }
}
