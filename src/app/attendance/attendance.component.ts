import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
 
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { BulkUploadDialogComponent } from '../bulk-upload-dialog/bulk-upload-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { response } from 'express';
//import { DownloadFileService } from '../download-file.service';

export interface Project {
  id: number,
  projectName: string,
  teamMemberName: string,
  noOfDaysOfAttendance: Int32Array,
  noOfHours: Int32Array,
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  memberId: string ='';
  projectId: string ='';
 
  StartDateSelected: any;
 
  fetchStartDateSelected(){
    console.log("date selected by user is --- " +this.StartDateSelected);
  }
 
  EndDateSelected: any;
  fetchEndDateSelected(){
    console.log("date selected by user is --- " +this.EndDateSelected);
  }
 
  maxDate?: string;
  constructor(public dialog: MatDialog,private httpClient:HttpClient, private authService:AuthService){
    const today=new Date();
    this.maxDate=today.toISOString().split('T')[0];
  }

 
 
  displayedColumns: string[] = ['projectName','teamMemberName', 'noOfDaysOfAttendance', 'noOfHours'];
  dataSource:any;
 
  teams:any;
 
  showBulkUploadPopup = false;
 
 
 
  ngOnInit(): void {
   this.loadData();
  }
  loadData(){
    this.httpClient.get('https://localhost:').subscribe({next:(value:any)=>{
     this.teams=value;
    this.dataSource = new MatTableDataSource<Project>(value);
    }})
  }
 
  openBulkUploadPopup(): void {
    const dialogRef = this.dialog.open(BulkUploadDialogComponent);
 
    dialogRef.afterClosed().subscribe(result => {
      // The result is the data passed from the modal
      console.log('Dialog closed with data:', result);
      if (result) {
        let res:Project[]=result.data.map((x:any)=>{
          return {projectName: x['Project Name '],
            teamMemberName: x['Team Member Name'],
            noOfDaysOfAttendance: x['No Of Days Of Attendance '],
            noOfHours: x['Number Of Hours '],}
        })
        this.teams=res;
        this.dataSource = new MatTableDataSource<Project>(res);
      }
    });
  }
 
  closeBulkUploadPopup(): void {
    //this.showBulkUploadPopup = false;
  }
 
  /*exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.teams);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teams');
    XLSX.writeFile(wb, 'teams.xlsx');
  } */
 
  handleFileInput(event: any): void {
    const file = event.target.files[0];
    // Handle file input as needed
    console.log('Selected file:', file);
  }
 
  uploadBulkData(): void {
    // Implement bulk upload logic using the selected file
    console.log('Bulk data uploaded!');
    this.closeBulkUploadPopup();
  }


  public exportToExcel(): void{
    this.authService.exportToExcel()
    .subscribe((response: HttpResponse<any>) =>
      {
        let fileName=response.headers.get('file-name')
        ?.split(';')[1].split('=')[1];
        let blob:Blob=response.body as Blob;
        let a = document.createElement('a');
        //a.download=fileName;
        a.href=window.URL.createObjectURL(blob);
        a.click();
      })
  }
}
