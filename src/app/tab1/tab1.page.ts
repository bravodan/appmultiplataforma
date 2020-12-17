import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IRefBibliografica } from '../models/ref-bibliograficas';
import { AuthService } from '../services/auth.service';
import { RefBibilograficasService } from '../services/ref-bibilograficas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public refBiblio: IRefBibliografica[] = [];
  public cargando: boolean = true;

  constructor(
    public refServices: RefBibilograficasService,
    public toastController: ToastController,
    private authServices: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.authServices.getUser() != undefined) {
      this.getRefBibliograficas();
    }
    else{
      this.authServices.logout().then(() => {
        this.presentToast("Autenticación PERSISTENTE no implementada, recargue la página e inicie sesión de nuevo", 5000);
        this.router.navigate(['']);
      });
    }
  }

  public getRefBibliograficas() {
    this.refServices.getAll(this.authServices.getUser().user.uid).subscribe(
      data => {
        this.refBiblio = data;
        this.cargando = false;
      },
      error => {
        this.cargando = false;
        console.log("Error al obtener las referencias \n", error);
      },
    )
  }

  async eliminarReferencia(item: IRefBibliografica) {
    await this.refServices.delete(item.idReferencia, this.authServices.getUser().user.uid).then(data => {
      this.presentToast("Se ha eliminado exitosamente", 2000);
    }
    ).catch(error => {
      this.presentToast("Ups! Ha ocurrido un error", 2000);
      console.log("Error al eliminar \n" + error);
    });

  }

  editarRefBibliografica(refBibliografica: IRefBibliografica) {
    this.refServices.set(refBibliografica);
  }

  async presentToast(message: string, duration:number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
