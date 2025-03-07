import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateServiceScheduleDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the associated service (UUID)',
  })
  @IsNotEmpty()
  @IsString()
  service_id: string;

  @ApiProperty({
    example: 1,
    description: 'Day of the week (1 = Monday, 7 = Sunday)',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(7)
  day_of_week: number;

  @ApiProperty({
    example: '9',
    description: 'Start time of the service',
    minimum: 6,
    maximum: 17,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(6)
  @Max(17)
  start_time: number;

  @ApiProperty({
    example: '17',
    description: 'End time of the service',
    minimum: 7,
    maximum: 18,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(7)
  @Max(18)
  end_time: number;
}
