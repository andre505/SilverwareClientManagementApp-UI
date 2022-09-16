import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../models/ui-models/client.model';
import { ClientResponse } from '../models/ui-models/client.model';
import { SilverwareclientService } from './silverwareclient.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  clientResponse!: ClientResponse;
  clients: Client[] = [];
  displayedColumns: string[] = ['name', 'description', 'clienttype', 'email', 'address','created', 'edit'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private clientService: SilverwareclientService) { }

  ngOnInit(): void {
    //Fetch Students
    this.clientService.getClients()
    // .subscribe(
    //    successResponse => {
    //     console.log(successResponse);
    //     this.students = successResponse;
    //     this.dataSource = new MatTableDataSource<Student>(this.students); },
    //     errorResponse => {
    //         console.log(errorResponse);
    //       }
    // )

    .subscribe({
      next: (response) => {console.log(response); this.clientResponse = response;
         this.dataSource = new MatTableDataSource<Client>(this.clientResponse.data);
        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
          this.dataSource.paginator = this.matPaginator;
        }

        if(this.matSort) {
          this.dataSource.sort = this.matSort;
        }

        },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })



    // ngOnInit() {
    //   getThings().subscribe(things => {
    //       this.dataSource.data = things;
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //   });
  }

    // this.studentService.getStudents()
    // .subscribe(
    // (successResponse)=> {
    //   this.students = successResponse;
    //   this.dataSource = new MatTableDataSource<Student>(this.students);
    // },
    // (errorResponse) => {
    //   console.log(errorResponse);
    // }
    // )
  // };

  filterClients() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
