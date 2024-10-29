import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  ck: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AllService,
    private swet: SweetsalertsServicesService
  ) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  // loading: boolean = false;
  // loginSuccess: boolean = false;
  // loginError: boolean = false;
  addPatients() {
    if (this.loginForm.invalid) {
      this.ck = true;
      return;
    }
    else {
      console.log("Patient data", this.loginForm.value);
      // this.loading = true;
      // this.loginSuccess = false;
      // this.loginError = false;
      this.service.superAdminLogin(this.loginForm.value).subscribe({
        next: (res) => {
          // this.loading = false;
          if (res.role === 'superadmin' || res.role === 'doctor' || res.role === 'caregiver' || res.role === 'patient') {
            this.handleRoleBasedRedirection(res);
            // this.loginSuccess = true;  // Login success message
            // this.swet.SucessToast();
            const login = res ? res.name : res.firstname;
            console.log("login",login)
            this.swet.SucessToast(`${login} Login successfully`);
            console.log("res.message", res.message)
          }
        },
      });
    }
  }

  handleRoleBasedRedirection(res: any) {
    // if (res.role === 'superadmin') {
    //   localStorage.setItem('Superadmin_token', res.token);
    //   localStorage.setItem('superadmin_name', res.name);
    //   this.router.navigate(["/superAdmin/home"]);
    // } else
    
    if (res.role === 'superadmin') {
      localStorage.setItem('Superadmin_token', res.token);
      localStorage.setItem('id', res.id);
      localStorage.setItem('superadmin_name', res.name);
      this.router.navigate(["/Admin/admin_dashboard"]);
    } else if (res.role === 'caregiver') {
      localStorage.setItem('caregiver_token', res.token);
      localStorage.setItem('id', res.id);
      localStorage.setItem('caregiver_name', res.name);
      localStorage.setItem('caregiverid', res.id);
      this.router.navigate(["/nurse/nurse_dashboard"]);
    } else if (res.role === 'patient') {
      localStorage.setItem('patient_token', res.token);
      localStorage.setItem('patient_name', res.name);
      localStorage.setItem('patient_id', res.id);
      this.router.navigate(["/patient/patient_dashboard"]);
    }
  }

  onChanges(data: string) {
    // if (data === 'superadmin') {
    //   this.loginForm.controls['email'].setValue('superadmin@gmail.com');
    //   this.loginForm.controls['password'].setValue('superadmin');
    // } else
    
    if (data === 'superadmin') {
      this.loginForm.controls['email'].setValue('osmelvillarreal@gmail.com');
      this.loginForm.controls['password'].setValue('osmelvillarreal');
    }
    else if (data === 'caregiver') {
      // this.form.controls['mobileNumber'].setValue('+919644605330');
      this.loginForm.controls['email'].setValue('mycaregiver@gmail.com');
      this.loginForm.controls['password'].setValue('caregiver');
    }
    else if (data === 'patient') {  
      // this.form.controls['mobileNumber'].setValue('+919644605330');
      this.loginForm.controls['email'].setValue('patient@gmail.com');
      this.loginForm.controls['password'].setValue('patient');
    }
  }
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }




}
