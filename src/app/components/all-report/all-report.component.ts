import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { GroupService } from 'src/app/services/group/group.service';

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
}

export interface Branch {
  branch_id: number;
  branch_name: string;
}

export interface Group {
  group_id: number;
  group_name: string;
  branch_id: number;
}

interface AssetCount {
  [branchName: string]: {
    [groupName: string]: number;
  };
}

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.component.html',
  styleUrls: ['./all-report.component.css']
})
export class AllReportComponent implements OnInit {
  assets: Asset[] = [];
  branches: Branch[] = [];
  groups: Group[] = [];
  assetCounts: AssetCount = {};
  rowTotals: { [branchName: string]: number } = {};
  columnTotals: { [groupName: string]: number } = {};
  grandTotal: number = 0;
  searchTerm: string = '';
  filteredBranches: Branch[] = [];

  constructor(
    private assetService: SectionService,
    private branchService: BranchService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.loadBranches();
    this.loadGroups();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe((data: Branch[]) => {
      this.branches = data;
      this.filteredBranches = this.branches;
      this.loadAssets();
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe((assets: Asset[]) => {
      this.assets = assets;
      this.calculateAssetCounts();
    });
  }

  calculateAssetCounts(): void {
    this.assetCounts = {};
    this.rowTotals = {};
    this.columnTotals = {};
    this.grandTotal = 0;

    // Initialize asset counts for branches and groups
    this.branches.forEach(branch => {
      this.assetCounts[branch.branch_name] = {};
      this.rowTotals[branch.branch_name] = 0;

      this.groups.filter(group => group.branch_id === branch.branch_id).forEach(group => {
        this.assetCounts[branch.branch_name][group.group_name] = 0;
        this.columnTotals[group.group_name] = 0;
      });
    });

    // Count assets
    this.assets.forEach(asset => {
      const branchName = asset.branch_name;
      const groupName = this.groups.find(group => group.group_id === asset.group_id)?.group_name;

      if (groupName) {
        this.assetCounts[branchName][groupName] = (this.assetCounts[branchName][groupName] || 0) + 1;
        this.rowTotals[branchName] = (this.rowTotals[branchName] || 0) + 1;
        this.columnTotals[groupName] = (this.columnTotals[groupName] || 0) + 1;
        this.grandTotal++;
      }
    });

    this.filterData(); // Apply search filter initially
  }

  filterData(): void {
    this.filteredBranches = this.branches.filter(branch =>
      branch.branch_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  downloadTableData(): void {
    const csvData = this.convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assets_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(): string {
    // Create CSV header
    const header = ['Branch Name', ...this.groups.map(group => group.group_name), 'Total'].join(',') + '\n';

    // Create CSV rows
    const rows = this.filteredBranches.map(branch => [
      branch.branch_name,
      ...this.groups.map(group => this.assetCounts[branch.branch_name][group.group_name] || 0),
      this.rowTotals[branch.branch_name] || 0
    ].join(',')).join('\n');

    // Add totals row
    const totalsRow = [
      'Total',
      ...this.groups.map(group => this.columnTotals[group.group_name] || 0),
      this.grandTotal
    ].join(',');

    return header + rows + '\n' + totalsRow;
  }
}
