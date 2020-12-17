import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.authForm = this.crearForm();
  }

  crearForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    this.authService.login(this.authForm.get("email").value, this.authForm.get("contrasena").value).then(auth => {
      this.router.navigate(['/tabs/tab1'])
    }).catch(error => this.presentToast("Credenciales incorrectas"));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  registrarse(){
    this.router.navigate(['/registro'])
  }
}
