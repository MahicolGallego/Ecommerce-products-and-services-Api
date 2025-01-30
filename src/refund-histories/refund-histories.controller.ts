import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefundHistoriesService } from './refund-histories.service';
import { CreateRefundHistoryDto } from './dto/create-refund-history.dto';
import { UpdateRefundHistoryDto } from './dto/update-refund-history.dto';

@Controller('refund-histories')
export class RefundHistoriesController {
  constructor(private readonly refundHistoriesService: RefundHistoriesService) {}

  @Post()
  create(@Body() createRefundHistoryDto: CreateRefundHistoryDto) {
    return this.refundHistoriesService.create(createRefundHistoryDto);
  }

  @Get()
  findAll() {
    return this.refundHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refundHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefundHistoryDto: UpdateRefundHistoryDto) {
    return this.refundHistoriesService.update(+id, updateRefundHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refundHistoriesService.remove(+id);
  }
}
