import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../service/employee-service';
import { get } from 'https';

export interface DialogData {
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
  gender: string;
  createdDate: Date;
}

@Component({
  selector: 'app-employee-componets',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule
    , MatDatepickerModule, MatSlideToggleModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-componets.html',
  styleUrl: './employee-componets.css',
})
export class EmployeeComponets implements OnInit {
  private fb = inject(FormBuilder);
private employeeService = inject(EmployeeService);
  readonly dialogRef = inject(MatDialogRef<EmployeeComponets>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA) as any;

  employeeForm = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    isActive: [true],
    gender: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    createdDate: [new Date(), Validators.required],
  });

  ngOnInit() {
    console.log(this.data); 
    if (this.data) {
      this.employeeForm.patchValue(this.data);
    }
  }
  get f() {
    return this.employeeForm.controls;
  }

  onSaveClick() {
    console.log(this.employeeForm.value);
    if (!this.employeeForm.valid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    if(this.employeeForm.value.id && this.employeeForm.value.id > 0){
   this.employeeService.updatePost(this.employeeForm.value as any).subscribe((data) => {
        this.dialogRef.close(true);
          });
    }else
    {
      this.employeeService.createPost(this.employeeForm.value as any).subscribe((data) => {
        this.dialogRef.close(true);
          });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
