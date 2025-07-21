import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(taskData: Partial<Task>) {
    const task = this.taskRepo.create(taskData);
    return this.taskRepo.save(task);
  }

  findAllByUser(userId: number) {
    return this.taskRepo.find({ where: { userId } });
  }

  complete(userId: number, name: string) {
    return this.taskRepo.update({ userId, name }, { status: 'bajarilgan' });
  }

  delete(userId: number, name: string) {
    return this.taskRepo.delete({ userId, name });
  }

  async findReminders(now: string) {
    return this.taskRepo.find({ where: { time: now, status: 'faol' } });
  }
}
