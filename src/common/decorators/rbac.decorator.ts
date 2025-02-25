import { SetMetadata } from '@nestjs/common';
import { Resources } from '../constants/enums/resources.enum';
import { ResourceActions } from '../constants/enums/resource-actions.enum';
import { Roles } from '../constants/enums/roles.enum';
import { SellerType } from '../constants/enums/seller-types.enum';

export const RBAC_KEY = 'rbac';

export type ResourcesKeys = keyof typeof Resources;
type ActionsKeys = keyof typeof ResourceActions;

export const Rbac = (
  roles: Roles[],
  action: ActionsKeys,
  resource: ResourcesKeys,
  seller_type?: SellerType,
) =>
  SetMetadata(RBAC_KEY, {
    allowed_roles: roles,
    seller_type: seller_type || null,
    allowed_action: action,
    resource,
  });
