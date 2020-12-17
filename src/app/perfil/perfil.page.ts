import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private authServices: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authServices.logout().then(() => {
      this.router.navigate(['']);
    });
  }

}
