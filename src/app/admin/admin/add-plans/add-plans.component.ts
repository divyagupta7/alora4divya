import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent {

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
      planName: ['', Validators.required],
      facility: ['',],
      beforeExpiry: ['', Validators.required],
      afterExpiry: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  Onupload(event: any) {
    if (event.target.files.length > 0) {
      this.imgs = event.target.files[0];
    }
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imagesBox = event.target.result;
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }


  onSubmit() {
    console.log("After Doctor data", this.addPlansForm.value);
    if (this.addPlansForm.invalid) {
      return;
    } else {
      try {
        console.log("Doctor data", this.addPlansForm.value);
        const formData: any = new FormData();
        formData.append('image', this.imgs);
        const arr = [
          'planName',
          'beforeExpiry',
          'afterExpiry',
        ];

        for (const key of arr) {
          formData.append(key, this.addPlansForm.get(key)?.value);
        }
        console.log("post api fire", this.addPlansForm);
        // console.log("formdata api fire", formData.getAll('image'));
        // console.log("formdata api fire", formData.getAll('doctorId'));
  
        // Call the postDoctors method without headers
        this.service.addPlansss(formData).subscribe((res: any) => {
          console.log(res);
          const patientName = res.data.name;  // Get the doctor's name from the response
          this.swet.SucessToast(`Caregiver ${patientName} created successfully`);
          // this.route.navigate(['Admin/view_patients']);
        },
        (err) => {
          console.log(err);
        });
        
      } catch (err) {
        console.log(err);
      }
    }
  }


}
