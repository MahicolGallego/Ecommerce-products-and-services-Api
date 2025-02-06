import { ConfigService } from '@nestjs/config';
import { ErrorManager } from '../exception-filters/error-manager.filter';
import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  configService: ConfigService,
): Promise<string> {
  try {
    const salt_rounds_str = configService.get<string>('HASH_SALT');

    if (!salt_rounds_str)
      throw new ErrorManager({
        type: 'CONFLICT',
        message: 'Salt rounds no set',
      });

    const salt_rounds = parseInt(salt_rounds_str, 10);

    if (isNaN(salt_rounds))
      throw new ErrorManager({
        type: 'CONFLICT',
        message: 'Invalid salt rounds configuration',
      });

    const hashPassword = await bcrypt.hash(password, salt_rounds);

    return hashPassword;
  } catch (error) {
    console.log(error);
    throw error instanceof Error
      ? ErrorManager.createErrorSignature(error.message)
      : ErrorManager.createErrorSignature('An unexpected error occurred');
  }
}
