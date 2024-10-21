import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homeHealthNew';
  
  showToast() {
    Swal.fire({ 
      toast: true, position: 'top-end',
       showConfirmButton: false, 
       timer: 3000, title: 'Success!',
        text: 'Sweet Alert Toast',
        icon: 'success',
       });
  }

error (){
  Swal.fire({
    title: "The Internet?",
    text: "That thing is still around?",
    icon: "question"
  });
}

  showMessage() {
    Swal.fire({ 
      text: 'Hello!',
       icon: 'success' });
  }
}
