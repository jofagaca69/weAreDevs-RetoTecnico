import {Component, OnInit} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare } from '@ng-icons/heroicons/outline';
import {Task, TaskManagerService} from '../../services/task-manager.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  providers: [provideIcons({ heroPencilSquare })],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  tasks: Task[] = [];

  constructor(private taskService: TaskManagerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks:Task[]) => {
      this.tasks = tasks;
    });
  }

  logout() {
    this.authService.logout();
  }
}
