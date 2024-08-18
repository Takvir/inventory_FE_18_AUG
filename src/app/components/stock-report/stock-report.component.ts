import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { GroupService } from 'src/app/services/group/group.service';

export interface Group2 {
  group_id: number;
  group_name: string;
  stock_in_hand: number;
}

interface Asset {
  id: number;
  branch_id: number;
  branch_name: string;
  group_id: number;
  desktop_name: string;
  configuration: string;
  tag_name: string;
  warranty: string;
  price: number;
  purchase_date: string;
  status: string;
  asset_get_by: string;
  serial_number: string;
  group_name: string;
}

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {
  assets: Asset[] = [];
  groups: Group2[] = [];
  groupStatusCounts: { [groupName: string]: { [status: string]: number } } = {};

  constructor(private assetService: SectionService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.loadAssets();
    this.loadGroups();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe(assets => {
      this.assets = assets;
      this.countAssetsByGroupAndStatus();
    });
  }

  loadGroups(): void {
    this.groupService.getGroups2().subscribe(data => {
      this.groups = data;
    });
  }

  countAssetsByGroupAndStatus(): void {
    this.assets.forEach(asset => {
      if (!this.groupStatusCounts[asset.group_name]) {
        this.groupStatusCounts[asset.group_name] = { 'Active': 0, 'InActive': 0, 'Faulty': 0 };
      }
      if (this.groupStatusCounts[asset.group_name][asset.status]) {
        this.groupStatusCounts[asset.group_name][asset.status]++;
      } else {
        this.groupStatusCounts[asset.group_name][asset.status] = 1;
      }
    });
  }

  getTotalDevices(groupName: string): number {
    const groupStatus = this.groupStatusCounts[groupName];
    const stockInHand = this.groups.find(group => group.group_name === groupName)?.stock_in_hand || 0;
    return (groupStatus?.['Active'] || 0) + (groupStatus?.['InActive'] || 0) + (groupStatus?.['Faulty'] || 0) + stockInHand;
  }

  getStockInHand(groupName: string): number {
    return this.groups.find(group => group.group_name === groupName)?.stock_in_hand || 0;
  }
  downloadCSV(): void {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Asset Name,Number of Devices (Total),Active,In Active,Faulty,Stock In Hand\n';
  
    this.groups.forEach(group => {
      const totalDevices = this.getTotalDevices(group.group_name);
      const active = this.groupStatusCounts[group.group_name]?.['Active'] || 0;
      const inactive = this.groupStatusCounts[group.group_name]?.['InActive'] || 0;
      const faulty = this.groupStatusCounts[group.group_name]?.['Faulty'] || 0;
      const stockInHand = this.getStockInHand(group.group_name);
  
      csvContent += `${group.group_name},${totalDevices},${active},${inactive},${faulty},${stockInHand}\n`;
    });
  
    // Create a download link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'stock_report.csv');
    document.body.appendChild(link); // Required for Firefox
  
    link.click();
    document.body.removeChild(link);
  }
  
}
