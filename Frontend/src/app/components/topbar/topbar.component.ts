import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    MenubarModule, 
    ButtonModule, 
    MessagesModule, 
    MegaMenuModule, 
    ChipModule,
    LottieComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  menuItems: MegaMenuItem[] = [
    {
      label: 'Support',
      icon: 'pi pi-fw pi-question-circle',
      items: [
        [
          {
            items: [
              {
                label: '(+47) 12345678',
                icon: 'pi pi-fw pi-phone',
                url: 'tel:+4797301375'
              },
              {
                label: 'support@pidgeon.no',
                icon: 'pi pi-fw pi-envelope',
                url: 'mailto:support@pidgeon.no'
              }
            ]
          },
        ]

      ]
    },
    
  ];

  lottieOptions: AnimationOptions = {
    path: '../../assets/anim/pp-lottie.json',

  }

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
