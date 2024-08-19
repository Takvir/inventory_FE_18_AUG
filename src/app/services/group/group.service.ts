import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Group {
  group_id: number;
  group_name: string;
  branch_id: number;
}


export interface Group2 {
  group_id: number;
  group_name: string;
  stock_in_hand: number;

}



@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:3000/api/groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getGroups2(): Observable<Group2[]> {
    return this.http.get<Group2[]>(this.apiUrl);
  }

  getGroupById(id: number): Observable<Group2> {
    return this.http.get<Group2>(`${this.apiUrl}/${id}`);
  }

  createGroup(group: Group2): Observable<Group2> {
    return this.http.post<Group2>(this.apiUrl, group);
  }

  updateGroup(id: number, group: Group2): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, group);
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



