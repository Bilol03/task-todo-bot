import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskService } from 'src/task/task.service';
import { BotService } from '../bot/bot.service';
import * as dayjs from 'dayjs';

@Injectable()
export class SchedulerService {
  constructor(
    private taskService: TaskService,
    private botService: BotService,
  ) {}

  @Cron('*/1 * * * *') 
  async handleReminders() {
    const now = dayjs().format('YY.MM.DD HH:mm');
    const tasks = await this.taskService.findReminders(now);
    for (const task of tasks) {
      await this.botService.sendReminder(
        task.userId,
        `⏰ Eslatma: "${task.name}" vaqti keldi!`,
      );
    }
  }
}
