import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/permissions/permissions.service';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { RBAC_KEY } from 'src/common/decorators/rbac.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      //Get user data from request
      const request = context.switchToHttp().getRequest();

      const { user } = request;

      //Get neccesary RBAC metadata
      const handler = context.getHandler();
      const rbacMetadata = this.reflector.get(RBAC_KEY, handler);

      const { allowed_roles, seller_type, allowed_action, resource } =
        rbacMetadata;

      //if role have permissions or not
      if (!allowed_roles.includes(user.role))
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'This type of user does not have sufficient permissions',
        });

      //Get type of user permissions from database
      const userRolePermissions = await this.permissionsService.findOne({
        role: user.role,
        entity: resource,
        seller_type,
      });

      if (!userRolePermissions)
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'No permissions found for this user role',
        });

      //Validate permissions to perform the action on the assigned resource
      if (!userRolePermissions[allowed_action])
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message:
            'This type of user does not have sufficient permissions to perform this action',
        });

      return true;
    } catch (error) {
      console.error(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }
}
