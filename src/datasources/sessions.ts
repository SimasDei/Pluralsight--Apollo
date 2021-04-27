import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { filter } from 'lodash';

import * as sessions from '../data/sessions.json';
import { Session } from '../types';

export class SessionsAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<any>) {}

  getSessions(args): Session[] {
    return filter(sessions, args);
  }

  getSessionById(id: number) {
    return sessions.find((s) => s.id == id) || null;
  }
}

export default SessionsAPI;
