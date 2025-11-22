import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [MaterialModule, ReactiveFormsModule, FormsModule, NavbarComponent, RouterModule]
})
export class SharedModule { }
