import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Estoque',
        icon: 'pi pi-warehouse',
        routerLink: '/estoque',
      },
      {
        label: 'Faturamento',
        icon: 'pi pi-dollar',
        routerLink: '/faturamento',
      },
    ];
  }
}
