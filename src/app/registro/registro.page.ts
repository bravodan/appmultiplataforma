import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.regForm = this.crearForm();
  }

  crearForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrarse() {
    if (this.regForm.valid) {
      this.authService.register(this.regForm.get("email").value, this.regForm.get("contrasena").value).then(auth => {
        this.router.navigate(['/tabs/tab1'])
      }).catch(error => console.log(error));
    }
    else{
      this.regForm.markAllAsTouched();
    }
  }
}
