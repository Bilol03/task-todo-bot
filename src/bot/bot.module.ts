import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TaskModule } from 'src/task/task.module';
import { Task } from 'src/task/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([Task]), ConfigModule],
  providers: [BotService],
})
export class BotModule {}
