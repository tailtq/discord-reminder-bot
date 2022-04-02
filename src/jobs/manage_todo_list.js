import { Client } from '@notionhq/client';
import BaseCronJob from '../core/base_cron_job';
import { ReminderService, UserService } from '../services';
import { REMINDER_ITEMS, TODO_LIST_REMINDING_TIME } from '../constants';
import { NOTION_MESSAGES } from '../constants/messages';

export default class ManageTodoListJob extends BaseCronJob {
  CRON_JOB_PATTERN = process.env.MANAGE_TODO_LIST_PATTERN;

  /**
   * @param {DiscordConnector} platformConnector
   */
  constructor(platformConnector) {
    super();
    this.platformConnector = platformConnector;
    this.userService = new UserService();
    this.reminderService = new ReminderService();
    this.notion = new Client({ auth: process.env.NOTION_SECRET_KEY, notionVersion: '2021-08-16' });
  }

  /**
   * @returns {Promise<void>}
   */
  async handle() {
    // function is already stable -> shouldn't run anymore (can change the Discord app, but it is not needed)
    if (process.env.APP_ENVIRONMENT === 'local') return;

    const user = (await this.userService.findMany())[0];
    const reminderData = {
      userId: user.id,
      itemId: 0,
      itemType: REMINDER_ITEMS.todoListReminder,
      platform: user.platform,
    };
    const now = this.getVietnameseTime();
    const dateNowText = now.format('DD/MM/YYYY');
    const timeNowText = now.format('HH:mm');
    const todoListPageId = process.env.TODO_LIST_PAGE_ID;
    // fetch blocks from notion
    const pageBlocks = (await this.notion.blocks.children.list({ block_id: todoListPageId })).results;
    const todoListFromIndex = pageBlocks.findIndex((block) => {
      return block.heading_2?.text?.[0].plain_text === dateNowText;
    });
    if (todoListFromIndex === -1) {
      // send reminder to create todo list hourly
      if (timeNowText >= '07:00' && timeNowText <= '12:00') {
        await this.publishMessageAndCreateReminder(reminderData, NOTION_MESSAGES.todoListNotCreated, user);
      }
      return;
    } else if (TODO_LIST_REMINDING_TIME.indexOf(timeNowText) === -1) {
      return;
    }
    // handle publishing todo-list at the specific times
    let todoListToIndex;
    for (let i = todoListFromIndex + 1; i < pageBlocks.length; i += 1) {
      if (pageBlocks[i].type !== 'to_do') {
        todoListToIndex = i;
        break;
      }
    }
    todoListToIndex = todoListToIndex || pageBlocks.length;
    const todoListBlocks = pageBlocks.slice(todoListFromIndex + 1, todoListToIndex);
    const todoListText = todoListBlocks.filter(block => block.type === 'to_do').map(block => {
      const doneEmoji = block.to_do?.checked ? ':white_check_mark:' : ':black_large_square:';
      return `${doneEmoji} ${block.to_do?.text?.[0].plain_text}`;
    });
    const message = `All tasks today:\n${todoListText.join('\n')}`;
    await this.publishMessageAndCreateReminder(reminderData, message, user);
  }

  /**
   * @param {Object} reminderData
   * @param {string} message
   * @param {Object} user
   * @returns {Promise<void>}
   */
  async publishMessageAndCreateReminder(reminderData, message, user) {
    const platformMessage = await this.platformConnector.publishMessage(user.platformId, message);
    reminderData.message = message;
    reminderData.platformMessageId = platformMessage.id;
    await this.reminderService.create({ data: reminderData });
  }
}
