import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
  exports: [TaskService, TypeOrmModule]
})
export class TaskModule {}
