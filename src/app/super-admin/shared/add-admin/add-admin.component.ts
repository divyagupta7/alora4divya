

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  ckDep: boolean = false;
  addDoctorform: any;
  imgs: any;
  qimgs: any;
  notificationMessage: string = '';
  notificationTimer: any;
  namesss:any
    imagesBox = '../../../../../../assets/img/product/product1.jpg'

     constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: AllService,
        private swet:SweetsalertsServicesService
      ) {
        this.addDoctorform = this.fb.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
          mobileNumber: ['', Validators.required],
          fullAddress: ['', Validators.required],
          image: ['', Validators.required],
          license: ['', Validators.required],
          formDate: ['', Validators.required],
          toDate: ['', Validators.required],
        })
      }
  ngOnInit(): void {
    
  }


  addDoctor() {
    console.log("After Doctor data", this.addDoctorform.value);
    if (this.addDoctorform.invalid) {
      this.ckDep = true;
      return;
    } else {
      try {
        console.log("Doctor data", this.addDoctorform.value);
        const formData: any = new FormData();
        formData.append('image', this.imgs);
        formData.append('license', this.qimgs);
        const arr = [
          'name',
          'email',
          'password',
          'mobileNumber',
          'fullAddress',
          'formDate',
          'toDate'
        ];
        for (const key of arr) {
          formData.append(key, this.addDoctorform.get(key)?.value);
        }
        console.log("post api fire", this.addDoctorform);
        console.log("formdata api fire", formData.getAll('image'));
        this.service.postDoctors(formData).subscribe((res: any) => {
          console.log("response",res);
          // this.swet.SucessToast();
          const doctorName = res.data.name;  // Get the doctor's name from the response
          this.swet.SucessToast(`Agency ${doctorName} created successfully`);
          this.router.navigate(['/superAdmin/view_admins']);
        },
          (err) => {
            console.log(err);
            this.swet.errorToasts(err.error.message);  
          });
      } catch (err) {
        console.log(err);  
      }
    }
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

      Onuploadquali(event: any) {
        if (event.target.files.length > 0) {
          this.qimgs = event.target.files[0];
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
    

      
  openproduct() {
    this.router.navigate(["super-admin/doctor"])
  }

  Cancel() {
    this.router.navigate(["/superAdmin/view_admins"])
  }

 


  
}




             
