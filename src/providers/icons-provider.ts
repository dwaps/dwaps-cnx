import { Injectable } from '@angular/core';


@Injectable()
export class IconsProvider {

  private icons:any;

  public constructor(){
    this.icons = [
      {name: "baseball",color: "purple", num: Math.trunc(Math.random()*100)},
      {name: "basket",color: "burlywood", num: Math.trunc(Math.random()*100)},
      {name: "attach",color: "red", num: Math.trunc(Math.random()*100)},
      {name: "basketball",color: "indianred", num: Math.trunc(Math.random()*100)},
      {name: "beer",color: "mediumseagreen", num: Math.trunc(Math.random()*100)},
      {name: "bonfire",color: "tomato", num: Math.trunc(Math.random()*100)},
      {name: "bowtie",color: "thistle", num: Math.trunc(Math.random()*100)},
      {name: "build",color: "slategray", num: Math.trunc(Math.random()*100)},
      {name: "bug",color: "teal", num: Math.trunc(Math.random()*100)},
      {name: "brush",color: "violet", num: Math.trunc(Math.random()*100)},
      {name: "bulb",color: "deeppink", num: Math.trunc(Math.random()*100)},
      {name: "cafe",color: "turquoise", num: Math.trunc(Math.random()*100)},
      {name: "camera",color: "orangered", num: Math.trunc(Math.random()*100)},
      {name: "car",color: "mediumaquamarine", num: Math.trunc(Math.random()*100)},
      {name: "chatbubbles",color: "lightpink", num: Math.trunc(Math.random()*100)},
      {name: "checkmark-circle",color: "darkred", num: Math.trunc(Math.random()*100)},
      {name: "clock",color: "darkslateblue", num: Math.trunc(Math.random()*100)},
      {name: "code",color: "chartreuse", num: Math.trunc(Math.random()*100)},
      {name: "color-wand",color: "chocolate", num: Math.trunc(Math.random()*100)},
      {name: "happy",color: "darkolivegreen", num: Math.trunc(Math.random()*100)}
    ];
  }

  public getIcons():any
  {
    return this.icons;
  }

}
