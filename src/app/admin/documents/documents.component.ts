import { Component } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  constructor(private api:AllService){}

  nurse:any[]=[];
  searchTerm: string = '';
  filteredNurse: any[] = [];

  getNurse(){
    this.api.getcaregivers().subscribe((res:any)=>{
      console.log(res);
      this.nurse=res.data;
    })
  }

  filterClients() {
    if (!this.searchTerm) {
      this.nurse = [...this.filteredNurse]; // Reset to original list
      return;
    }

    this.nurse = this.filteredNurse.filter(item => {
      return (
        item.caregiverName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.address?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  ngOnInit() {
    // Store the original data when component initializes
    this.getNurse();
    this.filteredNurse = [...this.nurse];
  }

  id:any;
  docByIdData:any=[];
docById(data: any) {
  this.id = data;
  this.api.getNurseDoc(data).subscribe((res: any) => {
    this.docByIdData = res.data;
  })
}
}
