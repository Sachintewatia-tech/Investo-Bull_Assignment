import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit,inject } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule,MatSort,Sort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatBadgeModule,MatBadge} from '@angular/material/badge';

@Component({
  selector: 'app-fetch-data',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatTableModule,MatPaginatorModule,MatSortModule,MatBadgeModule],
  templateUrl: './fetch-data.component.html',
  styleUrl: './fetch-data.component.css'
})
export class FetchDataComponent implements OnInit {
  httpclient = inject(HttpClient);
  displayedColumns: string[] = ['symbol', 'open', 'nifty', 'pctChange', 'signal'];
  data = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.httpclient.get('https://intradayscreener.com/api/openhighlow/cash').subscribe((res:any)=>{
      console.log(res);
      this.data.data = res;
    })
  }
}
