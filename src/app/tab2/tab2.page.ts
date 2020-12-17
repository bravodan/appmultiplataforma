import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { RefBibilograficasService } from '../services/ref-bibilograficas.service';
import { IRefBibliografica } from '../models/ref-bibliograficas';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public refBibliografica: IRefBibliografica;
  public refBibliograficaForm: FormGroup;
  public tiposPub: number[];
  public cargando: boolean = false;
  public id: string;

  constructor(
    private refService: RefBibilograficasService,
    private fb: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private authServices: AuthService,
  ) {

  }

  ngOnInit() {
    if (this.authServices.getUser() != undefined) {
      this.tiposPub = this.InicializarTipos();
      this.refBibliograficaForm = this.crearForm();
    }
    else{
      this.authServices.logout().then(() => {
        this.presentToast("Autenticación PERSISTENTE no implementada, recargue la página e inicie sesión de nuevo", 5000);
        this.router.navigate(['']);
      });
    }
  }

  ionViewDidEnter(){
    this.refBibliografica = undefined;
    this.refBibliograficaForm.reset();
    let ref = this.refService.get();
    if(ref != undefined){
      this.refBibliografica = ref;
      this.InicializarFormConDatos();
    }
    this.refService.set(undefined);
  }

  InicializarFormConDatos() {
    this.refBibliograficaForm.get("anioPub").setValue(this.refBibliografica.anyopub);
    this.refBibliograficaForm.get("autores").setValue(this.refBibliografica.autores);
    this.refBibliograficaForm.get("doi").setValue(this.refBibliografica.doi);
    this.refBibliograficaForm.get("eventorevista").setValue(this.refBibliografica.eventorevista);
    this.refBibliograficaForm.get("tipoPub").setValue(this.refBibliografica.tipoPub);
    this.refBibliograficaForm.get("titulo").setValue(this.refBibliografica.tituloPub);
  }

  InicializarTipos() {
    return [1, 2, 3];
  }

  crearForm() {
    return this.fb.group({
      titulo: ['', [Validators.required]],
      autores: ['', [Validators.required]],
      eventorevista: ['', [Validators.required]],
      tipoPub: ['', [Validators.required]],
      anioPub: ['', [Validators.required]],
      doi: ['', [Validators.required]],
    });
  }

  async guardar() {
    if (this.refBibliograficaForm.valid) {
      this.cargando = true;
      let id;
      if(this.refBibliografica != undefined){
        id = this.refBibliografica.idReferencia;
      }
      else{
        id = this.refService.createId();
      }
      const newRef: IRefBibliografica = {
        anyopub: this.refBibliograficaForm.get("anioPub").value,
        autores: this.refBibliograficaForm.get("autores").value,
        eventorevista: this.refBibliograficaForm.get("eventorevista").value,
        doi: this.refBibliograficaForm.get("doi").value,
        tipoPub: this.refBibliograficaForm.get("tipoPub").value,
        tituloPub: this.refBibliograficaForm.get("titulo").value,
        idReferencia: id,
      };
      console.log("elemento: ", newRef);
      await this.refService.add(newRef, this.authServices.getUser().user.uid).catch(error => {
        this.cargando = false;
        console.log("Ha ocurrido un error al crear el documento \n" + error);
        this.presentToast("Ups! Ha ocurrido un error", 2000);
      }).then(data => {
        this.cargando = false;
        this.presentToast("Se ha creado la referencia satisfatoriamente", 2000);
        this.refBibliograficaForm.reset();
        this.router.navigate(['/tabs/tab1'])
      })
    }
    else {
      this.refBibliograficaForm.markAllAsTouched();
    }
  }

  async presentToast(message: string, duration:number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
