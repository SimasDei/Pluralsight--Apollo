import { DataSource, DataSourceConfig } from 'apollo-datasource';

import * as sessions from '../data/sessions.json';
import { Session } from '../types';

export class SessionsAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<any>) {}

  getSessions(): Session[] {
    return sessions;
  }
}

export default SessionsAPI;
