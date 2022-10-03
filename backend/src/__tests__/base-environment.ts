import { JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';

export default class BaseEnvironment extends NodeEnvironment {
  public testPath;

  constructor(config: JestEnvironmentConfig, context: any) {
    super(config, context);
    this.testPath = context.testPath;
  }

  async setup() {
    this.global.process.env.NODE_ENV = 'TEST';
  }
}
