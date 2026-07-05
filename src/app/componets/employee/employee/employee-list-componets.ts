import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, Inject, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from '../service/employee-service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponets } from '../employee-componets/employee-componets';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-employee-list-componets',
  imports: [CurrencyPipe,MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatPaginator],
  templateUrl: './employee-list-componets.html',
  styleUrl: './employee-list-componets.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponets implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
private router = inject(Router);
  
  readonly dialog = inject(MatDialog);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);


  employeesData = signal<any[]>([]);

  displayedColumns: string[] = ['Name', 'Email', 'Mobile', 'Active','Price', 'Gender', 'createdDate', 'Action'];
  dataSource = new MatTableDataSource();
constructor(
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {
    this.dataSource.data = this.employeesData();
  }
  // constructor() {
  //   @Inject(PLATFORM_ID) public platformId: Object
  //   effect(() => {
  //     
  //   });
  // }

  onlogOut() {
    this.authService.removeToken();
    this.router.navigate(['/home']);
}

  onDeleteEmployee(row: any) {
    alert("Are you sure you want to delete this employee?");
    this.employeeService.deletePost(row.id).subscribe((data) => {
      this.employeesData.update((employees) => employees.filter((employee) => employee.id !== row.id));
    });
  }

  onEditEmployee(row: any) {
    const dialogRef = this.dialog.open(EmployeeComponets, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onGetAllEmployees()
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onGetAllEmployees()
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onAddEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeComponets, {
      data: { name: "", email: "", mobile: "", IsActive: true, Gender: "", createdDate: new Date() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onGetAllEmployees()
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onGetAllEmployees() {
    this.employeeService.getPosts().subscribe((data) => {
      this.employeesData.set(data);
      this.dataSource.paginator = this.paginator;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }
}