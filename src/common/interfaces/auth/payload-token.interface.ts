import { Roles } from 'src/common/constants/enums/roles.enum';

export interface IPayloadToken {
  sub: string;
  role: Roles;
}
