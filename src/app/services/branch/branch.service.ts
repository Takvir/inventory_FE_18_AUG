import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Branch {
  branch_id: number;
  branch_name: string;

}
@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://11.11.7.41:3000/api/branches/';

  constructor(private http: HttpClient) { }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  getBranchById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branch);
  }

  updateBranch(id: number, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
