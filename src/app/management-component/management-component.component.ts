import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.css']
})
export class ManagementComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  web: AbstractControl;
  java: AbstractControl;
  users$: Observable<User>
  baseUrl = "http://127.0.0.1:8080/"
  CurrentUser: any;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'web': [''],
      'id': [''],
      'java': ['']

    })
    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.web = this.myForm.controls['web'];
    this.java = this.myForm.controls['java']
  }
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  }
  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' + this.id.value);
    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
    }
  }
  add() {
    this.httpClient.post(this.baseUrl + "user", this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert("添加成功")
        }
      }
    )
  }
  delete() {

    if (!this.CurrentUser) {
      alert("必需先选择用户!")
    } else {
      console.log(this.CurrentUser.id)
      this.httpClient.delete(this.baseUrl + "user/" + this.CurrentUser.id).subscribe(
        (val: any) => {

          if (val.succ) {
            alert("删除成功")
            this.ngOnInit();
          }

        })
    }
  }
  select(u: User) {
    this.CurrentUser = u
    this.myForm.setValue(this.CurrentUser)
  }
  update() {
    if (!this.CurrentUser) {
      alert("必需先选择用户!")
    } else {
      this.httpClient.put(this.baseUrl + "user", this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert("修改成功")

          }

        })
    }
  }

}
