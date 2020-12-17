import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private authServices: AuthService,
    private router:Router,
    public toastController: ToastController
    ) {}

  ngOnInit(){
    if (this.authServices.getUser() == undefined) {
      this.authServices.logout().then(() => {
        this.presentToast("Autenticación PERSISTENTE no implementada, recargue la página e inicie sesión de nuevo", 5000);
        this.router.navigate(['']);
      });
    }
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
