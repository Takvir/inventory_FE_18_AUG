import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class TagAssetService {

  private apiUrl = 'http://11.11.7.41:3000/api/assets';

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  updateAsset(id: number, asset: Asset): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, asset);
  }

  getAssetsByBranchAndGroup(branchId: number, groupId: number): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/branch/${branchId}/group/${groupId}`);
  }

  getAssetsByBranch(branchId: number): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/branch/${branchId}`);
  }

  getAssetsByGroup(groupId: number): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/group/${groupId}`);
  }

  getAssetsByBranchGroupAndSubBranch(branchId: number, groupId: number, subBranch: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/branch/${branchId}/group/${groupId}/sub_branch/${subBranch}`);
  }

  getAssetsByBranchAndSubBranch(branchId: number, subBranch: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/branch/${branchId}/sub_branch/${subBranch}`);
  }
}
