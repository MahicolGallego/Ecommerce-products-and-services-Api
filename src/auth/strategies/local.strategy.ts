import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { validatorEmail } from 'src/common/helpers/validator-email.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'localStrategy') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    try {
      if (!validatorEmail(email) || !password)
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });

      return await this.authService.validateUser({
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }
}
