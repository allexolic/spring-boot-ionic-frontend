import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredencialDTO } from "../models/credencial.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient,
                public storage: StorageService){

    }
    authenticate(creds : CredencialDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
                       creds,
                       {
                           observe: 'response',
                           responseType: 'text'
                       })
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfullLogin(authorizationValue : string) {
        let user : LocalUser = {
            token: authorizationValue,
            email: this.jwtHelper.decodeToken(authorizationValue).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}