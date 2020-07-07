import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ImgService{
     // рендеринг превью изображения
  renderImage(file, component) {
    // генерируем новый объект FileReader
    const reader = new FileReader();
    // добавляет атрибут src в изображение
    reader.onload = (event)=> {
      component.tempPictureUrl = event.target['result'];         
    }
    // когда файл считывается он запускает событие OnLoad.
    reader.readAsDataURL(file);
  }

}