import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  constructor(private keyCloak: KeycloakService) { }

  public logout(){
    this.keyCloak.logout()
  }
}
