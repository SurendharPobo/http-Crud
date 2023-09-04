import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cartList:any[]=[];

  constructor(private _authservice: AuthService,) { }


  ngOnInit(): void {
    debugger

    this._authservice.GetCartOrderList().subscribe((response:any)=>
    {
      
      this.cartList=response;
    })
  }

}
