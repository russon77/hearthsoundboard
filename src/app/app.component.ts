import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ICard } from './data.model';
import { CardService } from './card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public displayedColumns = ['name', 'class', 'media'];
  public dataSource: MatTableDataSource<ICard>;

  public error: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.error = false;
    this.dataSource = null;

    this.cardService
      .getCards()
      .subscribe(
        cards => {
          this.dataSource = new MatTableDataSource(cards);

          setTimeout(() => this.dataSource.paginator = this.paginator);
        },
        err => this.error = true
      );
  }

  public applyFilter(filterValue: string): void {
    // Remove whitespace and datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onPlay(url: string): void {
    const audio = new Audio(url);
    audio.play().then(() => audio.remove());
  }
}

