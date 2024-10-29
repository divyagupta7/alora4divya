import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  implements OnInit {

  addPlansForm!: FormGroup;


    

  url = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  imgs!: File;
    imagesBox = '../../../../../../assets/img/product/product1.jpg'

  constructor(
    private fb:FormBuilder,
    private service:AllService,
    private swet:SweetsalertsServicesService
  ){}

  ngOnInit(): void {
    this.getPatients();
    this.addPlansForm = this.fb.group({
      fcategoryname: [''],
      // facilityCategory:['']
      facilityCategory: this.fb.array([])  // Using FormArray here
    });
  }



  onSubmit(): void {
    if (this.addPlansForm.valid) {
      console.log(this.addPlansForm.value);
      this.service.addfacilitycategorysss(this.addPlansForm.value).subscribe((res:any)=>{
        this.swet.SucessToast(`Generate Lead Successfully`);
        console.log('form added',res)
       });
    }
  }

  patientsCount: any[] = [];
  paginatedDoctors: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  userId:any
  dataSend: any


  getPatients(){
    this.service.getgetFacilitys().subscribe((res:any)=>{
      this.patientsCount = res.data;
    })
  }


  get facilityCategory(): FormArray {
    return this.addPlansForm.get('facilityCategory') as FormArray;
  }

  addFacility(id: string): void {
    this.facilityCategory.push(this.fb.control(id));
  }

  onFacilityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.addFacility(selectElement.value);
  }

}
