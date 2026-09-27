import type { HttpClient } from "@/data/api/HttpClient";
import type { User } from "@/utils/types/User";
import type { UserAuthentication } from "@/utils/types/UserAuthentication";
import { API_ROUTES } from "@/utils/constants/apiRoutes";

export class UserRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  register(user: User): Promise<User> {
    return this.http.post<User>(API_ROUTES.USERS_REGISTER, user);
  }

  login(user: UserAuthentication): Promise<UserAuthentication> {
      return this.http.post<UserAuthentication>(API_ROUTES.USERS_LOGIN, user);
  }

  logout(): Promise<UserAuthentication> {
      return this.http.logoutPost<UserAuthentication>(API_ROUTES.USERS_LOGOUT);
  }
  
}
