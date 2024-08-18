import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { BranchComponent } from './components/branch/branch.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AssetAllComponent } from './components/asset-all/asset-all.component';
import { AssetBranchComponent } from './components/asset-branch/asset-branch.component';
import { AllReportComponent } from './components/all-report/all-report.component';
import { GroupComponent } from './components/group/group.component';
import { StockReportComponent } from './components/stock-report/stock-report.component';
import { TagEntryComponent } from './components/tag-entry/tag-entry.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { OldEquipmentComponent } from './components/old-equipment/old-equipment.component';
import { UpdateAssetComponent } from './components/update-asset/update-asset.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'branch-list', component: BranchComponent, canActivate: [AuthGuard] },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'all-asset', component: AssetAllComponent, canActivate: [AuthGuard] },
  { path: 'branch-asset', component: AssetBranchComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: AllReportComponent, canActivate: [AuthGuard] },
  { path: 'group-add', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'stock-report', component: StockReportComponent, canActivate: [AuthGuard] },
  { path: 'tag-entry', component: TagEntryComponent, canActivate: [AuthGuard] },
  { path: 'old-entry', component: OldEquipmentComponent, canActivate: [AuthGuard] },
  { path: 'update-asset', component: UpdateAssetComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
