import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-addcaregiver',
  templateUrl: './addcaregiver.component.html',
  styleUrls: ['./addcaregiver.component.css']
})
export class AddcaregiverComponent  implements OnInit {
  caregiverForm!:FormGroup;

  url = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  imgs!: File;
    imagesBox = '../../../../../../assets/img/product/product1.jpg'

  constructor(
    private fb:FormBuilder,
    private service:AllService,
    private swet:SweetsalertsServicesService
  ){}

  ngOnInit(): void {
    this.caregiverForm = this.fb.group({
      caregiverName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      electronicSignature: [''],
      caregiverNote: [''],
      password: ['', Validators.required]
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


  caregivercreted() {
    console.log("After Doctor data", this.caregiverForm.value);
    if (this.caregiverForm.invalid) {
      return;
    } else {
      try {
        console.log("Doctor data", this.caregiverForm.value);
        
        const formData: any = new FormData();
        formData.append('electronicSignature', this.imgs);
        
        const arr = [
          'caregiverName',
          'email',
          'address',
          'caregiverNote',
          'password'
        ];

        for (const key of arr) {
          formData.append(key, this.caregiverForm.get(key)?.value);
        }
        console.log("post api fire", this.caregiverForm);
        // console.log("formdata api fire", formData.getAll('image'));
        // console.log("formdata api fire", formData.getAll('doctorId'));
  
        // Call the postDoctors method without headers
        this.service.createcaregiver(formData).subscribe((res: any) => {
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
