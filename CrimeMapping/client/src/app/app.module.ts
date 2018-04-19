import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AddPanelComponent } from './add-panel/add-panel.component';
import { DeletePanelComponent } from './delete-panel/delete-panel.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DbAccessorService } from './db-accessor.service';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPanelComponent,
    DeletePanelComponent,
    SidePanelComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DbAccessorService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
