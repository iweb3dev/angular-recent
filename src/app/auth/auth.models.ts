import { AppState } from '../store/app-state';
import { LoginState } from './login/login.models';
import { RegisterState } from './register/register.models';
import { SocialLoginState } from './social-login/store/social-login.models';

export interface AuthStateModel extends AppState {
  auth: AuthState;
}

export interface AuthState {
  login: LoginState;
  register: RegisterState;
  socialLogin: SocialLoginState;
}
