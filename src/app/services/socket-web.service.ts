import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket{

  outEven: EventEmitter<any> = new EventEmitter();

  constructor(
    private cookieService: CookieService
    ) {
    super({
      url: 'http://localhost:5000',
      options: {
        query: {
          nomeSala: cookieService.get('room')
        }
      }
    });
    this.listen(); 
  }

  listen(){
    //está linha verifica evento do backend
    this.ioSocket.on('evento', (res: any) => this.outEven.emit(res));  
  }

  //verifica evento do front
  emitEvent = (payload = {}) =>{
    this.ioSocket.emit('event', payload);
  }
}
