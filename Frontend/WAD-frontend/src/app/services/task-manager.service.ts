import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Task {
  id?: number;
  description: string;
  status: 'P' | 'C' | 'Z';
  user?: string;
  created_at?: string;
  updated_at?: string;
  is_deleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}/tasks/`);
  }
}
