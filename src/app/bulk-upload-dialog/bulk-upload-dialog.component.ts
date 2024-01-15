import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-upload-dialog',
  templateUrl: './bulk-upload-dialog.component.html',
  styleUrls: ['./bulk-upload-dialog.component.css'],
})
export class BulkUploadDialogComponent {
  selectedFile: File | null = null;
  constructor(public dialogRef: MatDialogRef<BulkUploadDialogComponent>,private http: HttpClient) { }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ['.xlsx', '.xls'];
      const extension = file.name.substring(file.name.lastIndexOf('.'));

      if (allowedExtensions.includes(extension.toLowerCase())) {
        this.selectedFile = file;
      } else {
        alert('Invalid file type. Please select a valid Excel file.');
        this.selectedFile = null;
      }
    }
  }

  uploadBulkData() {
    if (!this.selectedFile) {
      console.error('Please select a file');
      return;
    }

    const uploadUrl = 'https://localhost:7078/api/Excel1/upload';
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post<string>(uploadUrl, formData)
      .subscribe(response => {
        console.log('File uploaded successfully:', response);
        this.closeDialog(response);
        // Handle success
      }, error => {
        console.error('File upload failed:', error);
        // Handle error
      });
  }

  closeDialog(excelData?:any): void {
    // Close the dialog
    this.dialogRef.close({data:excelData});
  }
}
