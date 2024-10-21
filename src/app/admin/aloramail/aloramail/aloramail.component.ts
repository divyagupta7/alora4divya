import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-aloramail',
  templateUrl: './aloramail.component.html',
  styleUrls: ['./aloramail.component.css']
})
export class AloramailComponent {


  emailForm!: FormGroup;
  patientbyIdData: any = []
  ck :boolean=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AllService,
    private swet: SweetsalertsServicesService,
    private  route:Router
   ) {
  }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      from: ['rehanmultanikiaantech@gmail.com', Validators.required],
      to: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })

    this.getSentEmails();
}

sentEmailData:any;
sentEmailDatas:any;

getSentEmails(){
  this.service.getEmailAdmin().subscribe((res:any)=>{
    this.sentEmailData = res.data
    this.sentEmailDatas = res.data.length
  })
}

addemails() {
  if (this.emailForm.invalid) {
    this.ck = true;
    return;
  } else {
    console.log("Patient data", this.emailForm.value);
    this.service.addemailAdmin(this.emailForm.value).subscribe({
      next: (res) => {
        console.log("Patient created data:", res);
        this.swet.SucessToast(`Mail Send Successfully`);
        this.route.navigate(["/Admin/View_Aloramail"]);
      },
      error: (err) => {
        console.log("Error creating patient:", err);
      }
    });
  }
}

}
