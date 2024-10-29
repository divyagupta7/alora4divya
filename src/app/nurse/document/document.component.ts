import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  addDocumentForm:FormGroup;
  userId: any;

  constructor(private api:AllService,private swet:SweetsalertsServicesService){
    const userIdString = localStorage.getItem('id');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.addDocumentForm=new FormGroup({
      document:new FormControl('',Validators.required),
      expiryDate:new FormControl('',Validators.required),
      caregiverId:new FormControl(this.userId),
    })
  }

  ngOnInit(): void {
    this.getDocumentByNurseId();
  }

  document:any[]=[];
  getDocumentByNurseId(){
    this.api.getDocumentByNurseId().subscribe((res:any)=>{
      console.log(res);
      this.document=res.data;
    })
  }

    imgs!: File;
    imagesBox = '../../../../../../assets/img/product/product1.jpg'




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


  addDocument() {
    console.log("addDocument", this.addDocumentForm.value);
    if (this.addDocumentForm.invalid) {
      return;
    } else {
      try {
        console.log("Doctor data", this.addDocumentForm.value);
        
        const formData: any = new FormData();
        formData.append('document', this.imgs);
        
        const arr = [
        
          'expiryDate',
          'caregiverId',
        ];

    
        for (const key of arr) {
          formData.append(key, this.addDocumentForm.get(key)?.value);
        }
        console.log("post api fire", this.addDocumentForm);
        // console.log("formdata api fire", formData.getAll('image'));
        // console.log("formdata api fire", formData.getAll('doctorId'));
  
        // Call the postDoctors method without headers
        this.api.addDocument(formData).subscribe((res: any) => {
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
