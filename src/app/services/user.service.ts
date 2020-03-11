import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';
import { Http, Headers, HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // constructor(private clientHttp : HttpClient) {
  constructor(private clientHttp : AppHttpClientService) {
  
  }

  getUsersList (params) {
    return this.clientHttp.get('user/getUserList', params);
  }

  getRolesList(params){
    return this.clientHttp.get('User/rolesManagementList', params);
  }

  saveUser(params){
    return this.clientHttp.post('User/addUser', params);
  }

  //Student services starts 
  getStudentsList(params){
    return this.clientHttp.get('User/studentList', params);
  }

  getStudentById(params){
    return this.clientHttp.get('User/studentList', params);
  }

  getById (params) {
    return this.clientHttp.get('User/getUserList', params);
  }
  
  getStudentInfo(params){
    return this.clientHttp.get('User/studentInfo', params);
  }

  //trainer-schedule service starts
  addTrainer(params){
    return this.clientHttp.post('User/addTrainerSchedule', params);
  }
  
  getTrainersList(params){
    return this.clientHttp.get('User/trainerScheduleList', params);
  }

  getTrainerById(params){
    return this.clientHttp.get('User/trainerScheduleList', params);
  }
  deleteTrainer(params){
      return this.clientHttp.delete('User/Delete', params);
  }
}