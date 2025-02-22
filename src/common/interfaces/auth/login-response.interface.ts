import { User } from 'src/users/entities/user.entity';

export interface ILoginResponse {
  access_token: string;
  user: User;
}
