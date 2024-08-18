import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch/branch.service';
import { GroupService } from 'src/app/services/group/group.service';
import { SectionService } from 'src/app/services/section/section.service';

export interface Asset {
  asset_id: number;
  branch_id: number;
  branch_name: string;
  group_id: number;
  group_name: string;
  desktop_name: string;
  configuration: string;
  tag_name: string;
  warranty: string;
  price: number;
  purchase_date: Date;
  status: string;
  asset_get_by: string;
  serial_number: string;
  sub_branch: string;
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

@Component({
  selector: 'app-asset-branch',
  templateUrl: './asset-branch.component.html',
  styleUrls: ['./asset-branch.component.css']
})
export class AssetBranchComponent implements OnInit {

  branches: Branch[] = [];
  groups: Group[] = [];
  assets: Asset[] = [];
  assetForm!: FormGroup;
  subBranchOptions: string[] = [];
  noDataFound: boolean = false;
  isBranchUser: boolean = false;

  constructor(
    private assetService: SectionService,
    private branchService: BranchService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assetForm = this.fb.group({
      branchId: [''],
      groupId: ['', Validators.required],
      subBranch: [{ value: '', disabled: true }]
    });

    this.loadBranches();
    this.loadGroups();

    // Check user type
    const userType = localStorage.getItem('user_type');
    if (userType === 'branch') {
      this.isBranchUser = true;
      this.assetForm.get('branchId')?.setValidators(Validators.required);
      this.assetForm.get('branchId')?.updateValueAndValidity();
    }
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe((data: Branch[]) => {
      const userType = localStorage.getItem('user_type');

      if (userType === 'superadmin') {
        this.branches = data;
      } else {
        const branchId = localStorage.getItem('branch_id');
        if (branchId) {
          const branchIdNum = parseInt(branchId, 10);
          this.branches = data.filter(branch => branch.branch_id === branchIdNum);
        } else {
          this.branches = []; // Or any default behavior if no branch ID is set
        }
      }
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }

  onBranchChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBranchId = parseInt(selectElement.value, 10);
    const selectedBranch = this.branches.find(branch => branch.branch_id === selectedBranchId);

    if (selectedBranch && selectedBranch.branch_name === 'Head Office') {
      this.subBranchOptions = [
        'Select Division',
        'Chairman Sir & MD & CEO Office',
        'Agent Banking',
        'AML & CFT',
        'ICT',
        'ADC',
        'Card Division'
      ];
      this.assetForm.get('subBranch')?.enable();
    } else {
      this.subBranchOptions = ['Select Division'];
      this.assetForm.get('subBranch')?.disable();
      this.assetForm.patchValue({ subBranch: 'Select Division' });
    }
  }

  loadAssets(): void {
    const { branchId, groupId, subBranch } = this.assetForm.value;
    this.noDataFound = false;

    if (branchId && groupId && subBranch && subBranch !== 'Select Division') {
      this.assetService.getAssetsByBranchGroupAndSubBranch(branchId, groupId, subBranch).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branchId && subBranch && subBranch !== 'Select Division') {
      this.assetService.getAssetsByBranchAndSubBranch(branchId, subBranch).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branchId && groupId) {
      this.assetService.getAssetsByBranchAndGroup(branchId, groupId).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branchId) {
      this.assetService.getAssetsByBranch(branchId).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (groupId) {
      this.assetService.getAssetsByGroup(groupId).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    }
  }

  isFAD(tagName: string): boolean {
    return tagName === 'Routed To FAD';
  }


  calculateAssetValue(purchaseDate: Date, price: number): number {
    const currentDate = new Date();
    const purchaseDateObj = new Date(purchaseDate);
    const yearsSincePurchase = (currentDate.getTime() - purchaseDateObj.getTime()) / (1000 * 3600 * 24 * 365);

    if (yearsSincePurchase > 5) {
      return 0;
    } else if (yearsSincePurchase > 4) {
      return price * 0.30; // 70% less
    } else if (yearsSincePurchase > 3) {
      return price * 0.50; // 50% less
    } else if (yearsSincePurchase > 2) {
      return price * 0.70; // 30% less
    } else if (yearsSincePurchase > 1) {
      return price * 0.80; // 20% less
    } else {
      return price * 0.90; // 10% less
    }
  }
}
