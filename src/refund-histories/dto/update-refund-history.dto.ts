import { PartialType } from '@nestjs/swagger';
import { CreateRefundHistoryDto } from './create-refund-history.dto';

export class UpdateRefundHistoryDto extends PartialType(CreateRefundHistoryDto) {}
