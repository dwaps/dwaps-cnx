import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { IconsProvider } from '../../providers/icons-provider';
import { User } from '../../components/user/user';

import { HelloPage } from '../hello/hello';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
  private readonly USER_KEY:string = "user";
  private user:User;

  private icons:any;
  private iconsProvider:IconsProvider;
  private inactiveColor:string; // Selected icon = color changed

  // Stockage mp
  private tabNum:number[];
  private tabIcons:number[];
  private tabIconsIsComplete:boolean; // Autorise/interdit le remplissage de tabNum et tabIcons

  public constructor(
    private navCtrl:NavController,
    private alertCtrl:AlertController,
    private storage:Storage)
  {
    this.user = new User();

    // VERIFICATION DE L'EXISTENCE D'UN UTILISATEUR
    storage.ready().then(()=>
    {
      storage.get(this.USER_KEY).then(user=>
      {
        if(!user)
        {
          this.showPromptWindow();
          return;
        }

        this.user = new User(user.pseudo, user.mp);
      })
    });

    this.init();
  }

  public onPageLoaded():void
  {
    this.init();
  }

  // METHODE D'INITIALISATION
  private init():void
  {
    this.icons = new IconsProvider().getIcons();
    this.inactiveColor = '#ddd';

    this.tabNum = [];
    this.tabIcons = [];
    this.tabIconsIsComplete = false;

    if(this.user.tk) // La 1ere fois, this.user n'existe pas !
      this.user.tk = undefined;
  }

  // METHODE DE GENERATION DU PROMPT
  // SI AUCUN PSEUDO N'EXISTE
  private showPromptWindow():void
  {
    this.alertCtrl
      .create({
        title: "PSEUDO",
        message: "Créer un pseudo pour tester...",
        inputs: [
          {
            name: 'pseudo',
            placeholder: 'Votre pseudo...'  
          }
        ],
        buttons: [
          {
            text: 'Sauvegarder',
            handler: data =>
            {
              if(data.pseudo)
              {
                this.user.setPseudo(data.pseudo);
                this.storage.set(this.USER_KEY, this.user);
              }
            }
          }
        ]
      })
      .present();
  }

  // METHODE DE GENERATION DE FENETRE DE MESSAGE
  private showAlertWindow(str:string):void
  {
    this.alertCtrl
      .create({
        title: "Infos",
        message: str,
        buttons: [
          {
            text: "OK",
            handler: ()=>
            {
              this.init();
            }
          }
        ]
      })
      .present();
  }

  // METHODE POUR LA CONSTRUCTION DU MOT DE PASSE
  // ET LA GENERATION DU TOKEN
  public buildMp(icon:any):void
  {
    console.log(this.user);
    if("pseudo" in this.user && undefined === this.user.pseudo)
    {
      this.showPromptWindow();
      return;
    }

    if(!this.tabIconsIsComplete && icon.color != this.inactiveColor)
    {
      icon.color = this.inactiveColor;
      this.tabNum.push(icon.num);
      this.tabIcons.push(icon.name);

      if(this.tabIcons.length == 5)
      {
        this.checkAccess();
        this.tabIconsIsComplete = true;
      }
    }
  }

  // METHODE DE CONTRÔLE D'ACCES
  private checkAccess():void
  {
    let
      result = 0,
      currentMp = this.tabIcons.join();

    // Génération du token
    this.tabNum.forEach((num,idx)=>{result+=num});
    this.user.tk = result;

    // Tentative de récupération de l'utilisateur
    // pour mise à jour du token
    // et définition du mot de passe si première connexion (inscription)
    this.storage
      .ready()
      .then(()=>
      {      
        this.storage
          .get(this.USER_KEY)
          .then(user=>
          {
            if(user)
            {
              if(undefined === user.mp)
                this.user.mp = currentMp;

              // Mise à jour de l'utilisateur enregistré
              // (nouvelle tentative de connexion ==> nouveau token)
              this.storage.set(this.USER_KEY, this.user);

              // Contrôle de l'accès
              if(this.user.mp == currentMp)
              {
                console.log("Accès autorisé");

                console.log(`Pseudo utilisateur : ${this.user.pseudo}`);
                console.log(`Password utilisateur : ${this.user.mp}`);
                console.log(`Token utilisateur : ${this.user.tk}`);

                this.navCtrl.push(HelloPage, {
                  user: this.user,
                  token: this.user.tk
                });
              }
              else
              {
                this.showAlertWindow("Accès refusé");
              }
            }
          })
        });


  }
}
