import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  friendlyName?: string;
  userId?: string;
  accountLink?: string;
  constructor(private keyCloak: KeycloakService) { }

  async ngOnInit() {
    const isLoggedIn = await this.keyCloak.isLoggedIn();
    if (isLoggedIn) {
      const userProfile = await this.keyCloak.loadUserProfile();

      this.friendlyName = userProfile.firstName;
      this.userId = userProfile.id;
      this.accountLink = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/account?referrer=steak-lasagne-frontend`

    }
  }

  public logout(){
    this.keyCloak.logout()
  }
}
