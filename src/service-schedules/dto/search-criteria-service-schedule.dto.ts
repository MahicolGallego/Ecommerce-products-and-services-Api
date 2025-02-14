import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { timeFormatRegex } from 'src/common/constants/regex/time-format.regex';

export class SearchCriteriaServiceScheduleDto {
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
    example: '09:00:00',
    description: 'Start time of the service',
    minimum: 6,
    maximum: 17,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(timeFormatRegex, {
    message: 'start time must be in HH:MM:SS format',
  })
  start_time: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'End time of the service',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(timeFormatRegex, {
    message: 'end time must be in HH:MM:SS format',
  })
  end_time: string;
}
