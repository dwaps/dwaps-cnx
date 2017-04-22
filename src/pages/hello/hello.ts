import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../components/user/user';

@IonicPage()
@Component({
  selector: 'page-hello',
  templateUrl: 'hello.html',
})
export class HelloPage {

  private user:User;
  private token:number;

  private srcImg:string;
  private title:string;
  private message:string;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.user = navParams.get('user');
    this.token = navParams.get('token');

    this.title = "DWAPS Formation";

    if(this.checkUserToken())
    {
      this.srcImg = "assets/img/logo.svg";
      this.message = `Bonjour ${this.user.pseudo} ! Je vous souhaite la bienvenue !`;
    }
    else
    {
      this.srcImg = "assets/img/forbidden.svg";
      this.message = "Vous n'avez pas l'autorisation d'accéder à cette resource !";
    }
  }

  public checkUserToken():boolean
  {
    return this.user.tk == this.token;
  }
}
