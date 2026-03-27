import { Component } from "@angular/core";
import { LoginDTO } from "../models/login.dto";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { first } from "rxjs";
import { LoginFormComponent } from "../components/login.form.component";

@Component({
  standalone: true,
  templateUrl: `./login.page.html`,
  imports: [LoginFormComponent],
})
export class LoginPage {
  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) { }

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  public onSubmit(dto: LoginDTO): void {
    this._loginService.login(dto)?.pipe(first()).subscribe({
      next: () => this._router.navigate(['/']),
    });
  }
}