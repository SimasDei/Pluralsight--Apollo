import { DataSourceConfig } from 'apollo-datasource';
import { RESTDataSource } from 'apollo-datasource-rest';
import { filter } from 'lodash';

import { Speaker } from '../types';

export class SpeakersAPI extends RESTDataSource {
  baseUrl: string;
  constructor() {
    super();

    this.baseURL = 'http://localhost:3000/speakers';
  }

  async getSpeakers(args): Promise<Speaker[]> {
    const data = await this.get<Speaker[]>('/');

    return filter(data, args);
  }

  async getSpeakerById(id: number): Promise<Speaker> {
    return await this.get<Speaker>(`/${id}`);
  }
}

export default SpeakersAPI;
