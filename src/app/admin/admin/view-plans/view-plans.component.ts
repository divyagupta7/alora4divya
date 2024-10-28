import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.css']
})
export class ViewPlansComponent implements OnInit {
    plans: any[] = [];
    filteredPlans: any[] = [];
    searchTerm: string = '';
    
    // Pagination properties
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalPages: number = 1;
    startIndex: number = 0;
    endIndex: number = 0;
    Math = Math; // Make Math available in template

    constructor(private api:AllService){}

    ngOnInit(): void {
        this.api.getPlans().subscribe((res:any)=>{
            console.log(res);
            this.plans = res.data;
            this.filteredPlans = this.plans;
            this.updatePagination();
        })
    }

    deletePlan(id:any){
        this.api.deletePlans(id).subscribe((res:any)=>{
            console.log(res);
            this.ngOnInit();
        })
    }

    filterPlans() {
        if (!this.searchTerm) {
            this.filteredPlans = this.plans;
        } else {
            const searchTermLower = this.searchTerm.toLowerCase();
            this.filteredPlans = this.plans.filter(plan => 
                (String(plan.planName || '').toLowerCase().includes(searchTermLower)) ||
                (String(plan.facility || '').toLowerCase().includes(searchTermLower)) ||
                (String(plan.planStatus || '').toLowerCase().includes(searchTermLower))
            );
        }
        this.currentPage = 1; // Reset to first page when filtering
        this.updatePagination();
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.filteredPlans.length / this.itemsPerPage);
        this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.endIndex = this.startIndex + this.itemsPerPage;
    }

    onPageChange(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePagination();
        }
    }

    onItemsPerPageChange() {
        this.currentPage = 1; // Reset to first page
        this.updatePagination();
    }

    getPageNumbers(): number[] {
        const pages: number[] = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }
}
