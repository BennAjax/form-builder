import { MongoMemoryServer } from 'mongodb-memory-server';
import BaseEnvironment from './base-environment';

export default class MongodbEnvironment extends BaseEnvironment {
  private serverOpts = { binary: { version: '4.2.8' } };

  // @ts-ignore
  public mongod: MongoMemoryServer;

  async setup() {
    await super.setup();
    this.mongod = await MongoMemoryServer.create(this.serverOpts);
    this.global.process.env.MONGODB_URI = this.mongod.getUri();
  }

  async teardown() {
    await this.mongod.stop();
  }
}
