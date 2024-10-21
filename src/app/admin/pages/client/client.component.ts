import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  constructor(
    private route: Router

  ) { }

  addclient() {
    this.route.navigate(['/Admin/Addclient'])
  }


}
