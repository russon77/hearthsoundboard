import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ICard } from './data.model';
import { CardService } from './card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['name', 'class', 'media'];
  dataSource: MatTableDataSource<ICard>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cardService: CardService) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);

    this.cardService
      .getCards()
      .subscribe(
        cards => {
          this.dataSource = new MatTableDataSource(cards);

          setTimeout(() => this.dataSource.paginator = this.paginator);
        }
      );
  }

  applyFilter(filterValue: string): void {
    // Remove whitespace and datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPlay(url: string): void {
    const audio = new Audio(url);
    audio.play().then(() => audio.remove());
  }
}

