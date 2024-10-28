import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent {

  addPlansForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: AllService){
    this.addPlansForm = this.fb.group({
      planName: ['', Validators.required],
      facility: ['', Validators.required],
      beforeExpiry: ['', Validators.required],
      afterExpiry: ['', Validators.required],
      planStatus: ['', Validators.required],
    })
  }

  onSubmit(){
    if(this.addPlansForm.valid){
      this.service.addPlans(this.addPlansForm.value).subscribe((res:any)=>{
        console.log(res)
      })
    }
  }
}
