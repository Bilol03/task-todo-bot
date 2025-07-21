import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Bot;
  private userSteps = new Map<number, any>();

  constructor(
    private readonly taskService: TaskService,
    private readonly configService: ConfigService,
  ) {
    const token = this.configService.get<string>('bot_token');
    if (!token) throw new Error('BOT_TOKEN is missing in env');
    this.bot = new Bot(token);
  }

  async onModuleInit() {
    this.bot.command('start', (ctx) =>
      ctx.reply('👋 To-Do botga xush kelibsiz!'),
    );

    this.bot.command('add', async (ctx) => {
      this.userSteps.set(ctx.from!.id, { step: 'name' });
      ctx.reply('📝 Vazifa nomini kiriting:');
    });
    this.bot.on('message:text', async (ctx) => {
      const userId = ctx.from?.id;
      const state = this.userSteps.get(userId);
      if (!state) return;

      if (state.step === 'name') {
        state.name = ctx.message.text;
        state.step = 'time';
        ctx.reply('⏰ Vaqtni kiriting (YY.MM.DD HH:mm):');
      } else if (state.step === 'time') {
        state.time = ctx.message.text;
        state.step = 'level';
        ctx.reply('📊 Darajani kiriting (low, medium, high):');
      } else if (state.step === 'level') {
        state.level = ctx.message.text;
        await this.taskService.create({
          userId,
          name: state.name,
          time: state.time,
          level: state.level,
          status: 'faol',
        });
        this.userSteps.delete(userId);
        ctx.reply('✅ Vazifa qo‘shildi!');
      }
    });

    this.bot.command('tasks', async (ctx) => {
      console.log(ctx.from, 'nimadur');
      const tasks = await this.taskService.findAllByUser(ctx.from!.id);
      if (!tasks.length) return ctx.reply('📭 Vazifalar yo‘q.');

      const msg = tasks
        .map((t) => `📌 ${t.name}\n⏰ ${t.time}\n📊 ${t.level}\n📎 ${t.status}`)
        .join('\n\n');
      ctx.reply(msg);
    });

    this.bot.command('complete', (ctx) => {
      this.userSteps.set(ctx.from!.id, { step: 'complete' });
      ctx.reply('📝 Qaysi vazifani bajardingiz (nomini yozing)?');
    });
    
    this.bot.start();
  }

  async sendReminder(userId: number, message: string) {
    await this.bot.api.sendMessage(userId, message);
  }
}
