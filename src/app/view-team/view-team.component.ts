import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { BulkUploadDialogComponent } from '../bulk-upload-dialog/bulk-upload-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


export interface Project {
  id: number,
  projectName: string,
  teamName:string ,
  teamMemberName: string,
  assignationStartDate: string,
  assignationEndDate: string,
}



 

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit{
  displayedColumns: string[] = ['projectCode','teamMemberName', 'assignationStartDate', 'assignationEndDate'];
  dataSource:any;

  teams:any;

  showBulkUploadPopup = false;

  constructor(public dialog: MatDialog,private httpClient:HttpClient) { }
  ngOnInit(): void {
   this.loadData(); 
  }
  loadData(){
    this.httpClient.get('https://localhost:7078/api/Item/items').subscribe({next:(value:any)=>{
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
        // let res:Project[]=result.data.map((x:any)=>{
        //   return {projectCode: x['projectCode'],
        //     // teamName:x['Team Name'] ,
        //     teamMemberName: x['teamMemberName'],
        //     assignationStartDate: x['assignationStartDate'],
        //     assignationEndDate: x['assignationEndDate'],}
        // })
        // this.teams=res;
        // this.dataSource = new MatTableDataSource<Project>(res);
        this.loadData();
      }
    });
  }

  closeBulkUploadPopup(): void {
    //this.showBulkUploadPopup = false;
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.teams);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teams');
    XLSX.writeFile(wb, 'teams.xlsx');
  }

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
}
