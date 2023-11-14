import { randomID } from '../util/utils.js';

export class Task {

  constructor(description) {
    this.id = randomID();
    this.description = description;
    this.insertedAt = new Date().getTime();
    this.finishedAt = null;
  }
}