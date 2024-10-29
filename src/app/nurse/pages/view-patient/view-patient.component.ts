import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  constructor(private api:AllService){}

  userId:any
  nurseLeadsData:any[] = []
  filteredData:any[] = []
  searchText:string = ''

  // Pagination properties
  currentPage:number = 1
  itemsPerPage:number = 10
  totalPages:number = 1
  pages:number[] = []

  ngOnInit(): void {
    localStorage.getItem('id')
    localStorage.getItem('nurse_name')
    this.getNurseLeads()
  }

  getNurseLeads(){
    this.api.getNurseLeads(this.userId).subscribe((res:any)=>{
      console.log(res);
      this.nurseLeadsData = res.data
      this.filteredData = [...this.nurseLeadsData]
      this.calculatePagination()
    })
  }

  // Filter function
  filterData() {
    if (this.searchText) {
      this.filteredData = this.nurseLeadsData.filter(item => 
        item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.leadCreatedDate.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredData = [...this.nurseLeadsData];
    }
    this.currentPage = 1; // Reset to first page when filtering
    this.calculatePagination();
  }

  // Pagination functions
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return this.startIndex + this.itemsPerPage;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
