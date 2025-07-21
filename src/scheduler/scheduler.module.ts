import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { TaskModule } from 'src/task/task.module';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [TaskModule, BotModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
