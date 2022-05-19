import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  friendlyName?: string;
  userId?: string;
  constructor(private keyCloak: KeycloakService) { }

  async ngOnInit() {
    const isLoggedIn = await this.keyCloak.isLoggedIn();

    if (isLoggedIn) {
      const userProfile = await this.keyCloak.loadUserProfile();
      this.friendlyName = userProfile.firstName;
      this.userId = userProfile.id;

    }
  }

  public logout(){
    this.keyCloak.logout()
  }
}
