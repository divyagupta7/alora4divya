import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.css']
})
export class AddFacilityComponent implements OnInit {
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
    this.addPlansForm = this.fb.group({
      facilityName: [''],
    });
  }



  onSubmit(): void {
    if (this.addPlansForm.valid) {
      console.log(this.addPlansForm.value);
      this.service.addFacilitys(this.addPlansForm.value).subscribe((res:any)=>{
        this.swet.SucessToast(`Generate Lead Successfully`);
        console.log('form added',res)
       });
    }
  }

}
