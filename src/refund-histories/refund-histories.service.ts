import { Injectable } from '@nestjs/common';
import { CreateRefundHistoryDto } from './dto/create-refund-history.dto';
import { UpdateRefundHistoryDto } from './dto/update-refund-history.dto';

@Injectable()
export class RefundHistoriesService {
  create(createRefundHistoryDto: CreateRefundHistoryDto) {
    return 'This action adds a new refundHistory';
  }

  findAll() {
    return `This action returns all refundHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refundHistory`;
  }

  update(id: number, updateRefundHistoryDto: UpdateRefundHistoryDto) {
    return `This action updates a #${id} refundHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} refundHistory`;
  }
}
