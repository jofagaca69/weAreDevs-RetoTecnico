import {Component, OnInit} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare } from '@ng-icons/heroicons/outline';
import {Task, TaskManagerService} from '../../services/task-manager.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  providers: [provideIcons({heroPencilSquare})],
  templateUrl: './dashboard.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  taskForm: FormGroup;
  tasks: Task[] = [];
  newTask = { description: '', status: 'P' };

  constructor(private fb: FormBuilder, private taskService: TaskManagerService, private authService: AuthService) {
    this.taskForm = fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  logout() {
    this.authService.logout();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks:Task[]) => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: number | undefined) {
    if (id) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.getTasks()
        }
      });
    }
  }

  addTask(): void {
    console.log(this.newTask);
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        this.getTasks();
        this.newTask = { description: '', status: 'P' };
        this.taskForm.reset()
      });
    }
  }

  editTask(task: any, status: string): void {
    task.status = status;
    this.taskService.updateTask(task.id, task).subscribe(() => {
      this.getTasks();
    });
  }
}
