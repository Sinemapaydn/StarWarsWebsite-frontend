import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    APP_URL = "";

    get API_URL(): string {
        if (window.location.port == "4200")
            return ""
        else (window.location.port == "4300")
            return "http://localhost:7256/"

    }

}