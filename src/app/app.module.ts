import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, FormGroup }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


import {MatIconModule} from '@angular/material/icon';
import { BranchComponent } from './components/branch/branch.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AssetAllComponent } from './components/asset-all/asset-all.component';
import { AssetBranchComponent } from './components/asset-branch/asset-branch.component';
import { AllReportComponent } from './components/all-report/all-report.component';
import { GroupComponent } from './components/group/group.component';
import { StockReportComponent } from './components/stock-report/stock-report.component';
import { TagEntryComponent } from './components/tag-entry/tag-entry.component';
import { LoginComponent } from './components/login/login.component';
import { OldEquipmentComponent } from './components/old-equipment/old-equipment.component';
import { UpdateAssetComponent } from './components/update-asset/update-asset.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    NavbarComponent,
 
  
    BranchComponent,
    EquipmentComponent,
    AssetAllComponent,
    AssetBranchComponent,
    AllReportComponent,
    GroupComponent,
    StockReportComponent,
    TagEntryComponent,
    LoginComponent,
    OldEquipmentComponent,
    UpdateAssetComponent,
    
  



   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatInputModule,
    BrowserAnimationsModule,MatTableModule,MatButtonModule,MatDatepickerModule,MatDialogModule,MatNativeDateModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
