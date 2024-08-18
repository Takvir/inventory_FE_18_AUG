import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch/branch.service';
import { GroupService } from 'src/app/services/group/group.service';
import { TagAssetService,  } from 'src/app/services/tag-asset/tag-asset.service';

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
  selector: 'app-update-asset',
  templateUrl: './update-asset.component.html',
  styleUrls: ['./update-asset.component.css']
})
export class UpdateAssetComponent implements OnInit {

  assets: Asset[] = [];
  viewAssetsForm!: FormGroup;  // For viewing assets
  editAssetForm!: FormGroup;   // For editing asset
  isEdit: boolean = false;
  editAssetId: number | null = null;
  branches: Branch[] = [];
  groups: Group[] = [];
  subBranchOptions: string[] = [];
  noDataFound: boolean = false;
  isBranchDisabled = true;
  isSubBranchDisabled = true;
  isGroupDisabled = true;


  isBranchUser: boolean = false;

  constructor( private tagService: TagAssetService,
    private branchService: BranchService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {
    this.viewAssetsForm = this.fb.group({
      branch_id: ['', Validators.required],
      group_id: ['', Validators.required],
      sub_branch: [{ value: '', disabled: this.isSubBranchDisabled }]

    });

    this.editAssetForm = this.fb.group({
      branch_id: ['', Validators.required],
      group_id: ['', Validators.required],
      desktop_name: ['', Validators.required],
      configuration: ['', Validators.required],
      tag_name: ['', Validators.required],
      warranty: ['', Validators.required],
      price: ['', Validators.required],
      purchase_date: ['', Validators.required],
      status: ['', Validators.required],
      asset_get_by: ['', Validators.required],
      serial_number: ['', Validators.required],
      sub_branch: ['', Validators.required],
      group_name: ['', Validators.required],
      branch_name: ['', Validators.required],
    });
 }

  ngOnInit(): void {
    this.loadBranches();
    this.loadGroups();

    const userType = localStorage.getItem('user_type');
    if (userType === 'branch') {
      this.isBranchUser = true;
      this.viewAssetsForm.get('branch_id')?.setValidators(Validators.required);
      this.viewAssetsForm.get('branch_id')?.updateValueAndValidity();
    }

    // this.editAssetForm.get('branch_id')?.disable();
    // this.editAssetForm.get('group_id')?.disable();
    // this.editAssetForm.get('sub_branch')?.disable();

    this.isBranchDisabled = true;
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
          this.branches = data.filter(branch => branch.branch_id === branchIdNum );
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
      this.viewAssetsForm.get('sub_branch')?.enable();
    } else {
      this.subBranchOptions = ['N/A'];
      this.viewAssetsForm.get('sub_branch')?.disable();
      this.viewAssetsForm.patchValue({ sub_branch: 'Select Division' });
    }
  }

  loadAssets(): void {
    const { branch_id, group_id, sub_branch } = this.viewAssetsForm.value;
    this.noDataFound = false;

    if (branch_id && group_id && sub_branch && sub_branch !== 'Select Division') {
      this.tagService.getAssetsByBranchGroupAndSubBranch(branch_id, group_id, sub_branch).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branch_id && sub_branch && sub_branch !== 'Select Division') {
      this.tagService.getAssetsByBranchAndSubBranch(branch_id, sub_branch).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branch_id && group_id) {
      this.tagService.getAssetsByBranchAndGroup(branch_id, group_id).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branch_id) {
      this.tagService.getAssetsByBranch(branch_id).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (group_id) {
      this.tagService.getAssetsByGroup(group_id).subscribe({
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

  editAsset(assetId: number): void {
    this.isEdit = true;
    this.editAssetId = assetId;
    this.tagService.getAssetById(assetId).subscribe(asset => {
      this.editAssetForm.patchValue({
        ...asset,
        branch_id: asset.branch_id,
        group_id: asset.group_id
      });
    });



  }

  onSubmit(): void {
    if (this.editAssetForm.valid) {
      if (this.isEdit && this.editAssetId) {
        this.tagService.updateAsset(this.editAssetId, this.editAssetForm.value).subscribe(() => {
          this.loadAssets();
          this.resetForm();
          window.confirm('Asset Updated Successfully!');

        });
      }

    }
  }

  resetForm(): void {
    this.editAssetForm.reset();
    this.isEdit = false;
    this.editAssetId = null;
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
