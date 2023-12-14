// Import the necessary modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditNoteModalComponent } from './edit-note-modal/edit-note-modal.component';

@NgModule({
  imports: [
    BrowserModule,
    ModuleMapLoaderModule,
    ServerModule,
    CommonModule,
    ColorPickerModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    EditNoteModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}