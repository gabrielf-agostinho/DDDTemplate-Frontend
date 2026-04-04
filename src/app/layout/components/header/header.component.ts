import { Component, EventEmitter, Inject, Output, Signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SYSTEM_INFO } from "../../../core/config/system-info.config";
import { SystemInfo } from "../../../core/models/SystemInfo.model";
import { ThemeService } from "../../services/theme.service";
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { ConfirmationService, MenuItem } from "primeng/api";
import { AuthService } from "../../../core/auth/auth.service";
import { ToastService } from "../../../core/services/toast.service";
import { SvgLoaderComponent } from "../../../shared/components/svg-loader/svg-loader.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { UserGetDTO } from "../../../shared/models/DTOs/users/user.dto";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule,
    RouterModule,
    SpeedDialModule,
    ConfirmDialogModule,
    ThemeSwitcherComponent,
    SvgLoaderComponent
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output()
  public toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  public direction: 'up' | 'down' | 'left' | 'right' = 'down';

  public currentUser: Signal<UserGetDTO | null>;

  public userOptions: MenuItem[] = [
    {
      label: 'Logoff',
      icon: 'pi pi-power-off',
      command: () => {
        this._confirmationService.confirm({
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: 'pi pi-power-off',
          rejectIcon: 'pi pi-undo',
          message: 'Você realmente deseja sair do sistema?',
          accept: () => {
            this._authService.logout();
            this._router.navigate(['/login']);
            this._toastService.showSuccessToast('Logoff realizado com sucesso!');
          }
        });
      },
    },
    {
      label: 'Trocar Senha',
      icon: 'pi pi-lock',
    },
  ];

  constructor(
    @Inject(SYSTEM_INFO) public systemInfo: SystemInfo,
    public themeService: ThemeService,
    private _confirmationService: ConfirmationService,
    private _authService: AuthService,
    private _router: Router,
    private _toastService: ToastService
  ) { 
    this.currentUser = toSignal(this._authService.currentUser<UserGetDTO>(), { initialValue: null });
  }

  public onToggleMenu(): void {
    this.toggleMenu.emit();
  }
}