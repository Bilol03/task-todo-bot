import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulerService {
  create(createSchedulerDto) {
    return 'This action adds a new scheduler';
  }

  findAll() {
    return `This action returns all scheduler`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduler`;
  }

  update(id: number, updateSchedulerDto) {
    return `This action updates a #${id} scheduler`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduler`;
  }
}
