import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
