import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productCondition= ['Good', 'Very good', 'its ok'];
  productForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private fb: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName : ['', Validators.required],
      productCategory : ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      comment: ['', Validators.required],

    });

if(this.editData) {
  this.actionBtn = "Update";
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
  this.productForm.controls['condition'].setValue(this.editData.condition);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['date'].setValue(this.editData.date);
  this.productForm.controls['comment'].setValue(this.editData.comment);
}
  }


  addProduct() {
    if (!this.editData) {
      if(this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:(err) => {
            alert('Error while adding the product');
  
          }
        })
      }
    } else {
this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert("Error while updating the record");
      }
    });
  }

}
