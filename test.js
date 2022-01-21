import { Client } from '@notionhq/client';
import moment from 'moment';

const notion = new Client({
    auth: '',
    notionVersion: '2021-08-16'
});

const todoListPageId = '00f5a432810f44c989ee78ac7aa4c3b6';
/**
  {
    "object": "block",
    "id": "c4598744-9dc5-436a-a9c6-cb59725da153",
    "created_time": "2022-01-16T19:12:00.000Z",
    "last_edited_time": "2022-01-16T19:12:00.000Z",
    "has_children": true,
    "archived": false,
    "type": "to_do",
    "to_do": {
      "text": [
        {
          "type": "text",
          "text": {
            "content": "Check the bot idea",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Check the bot idea",
          "href": null
        }
      ],
      "checked": false
    }
  }
 */

(async () => {
  const now = moment();
  const nowText = now.format('DD/MM/YYYY');
  const pageBlocks = (await notion.blocks.children.list({ block_id: todoListPageId })).results;
  const todoListFromIndex = pageBlocks.findIndex((block) => {
    return block.heading_2?.text?.[0].plain_text === nowText;
  });
  if (todoListFromIndex === -1) {
    // TODO: Remind create todo list
    return;
  }
  let todoListToIndex;
  for (let i = todoListFromIndex + 1; i < pageBlocks.length; i += 1) {
    if (pageBlocks[i].type !== 'to_do') {
      todoListToIndex = i;
      break;
    }
  }
  todoListToIndex = todoListToIndex || pageBlocks.length;
  const todoListBlocks = pageBlocks.slice(todoListFromIndex + 1, todoListToIndex);
  const todoListText = todoListBlocks.map(block => {
    const doneEmoji = block.to_do?.checked ? ':white_check_mark:' : ':black_large_square:';
    return `${doneEmoji} ${block.to_do?.text?.[0].plain_text}`;
  });
  // TODO: Remind at 8:00, 12:00, 18:00, 23:00
  // console.log(todoListToIndex);
})()
