export class User {

  constructor(
    public pseudo?:string,
    public mp?:string,
    public tk?:number) {}
  

  // ACCESSEURS

  public setPseudo(pseudo:string):void
  {
    this.pseudo = pseudo;
  }

  public setMp(mp:string):void
  {
    this.mp = mp;
  }

  public setToken(tk:number):void
  {
    this.tk = tk;
  }

  public getPseudo():string
  {
    return this.pseudo;
  }

  public getMp():string
  {
    return this.mp;
  }

  public getToken():number
  {
    return this.tk;
  }
}
