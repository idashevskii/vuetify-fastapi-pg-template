import { injectable, inject } from 'inversify';
import { AppConfig } from './AppConfig';

export interface FilteringQuery {
  search?: string;
  page: number;
  perPage: number;
  sortBy?: string;
}

export interface FilteringResult<T> {
  items: T;
  total: number;
}

type FetchOpts<R, TTL extends boolean> = {
  method: string;
  endpoint: string;
  data?: R;
  query?: Record<string, string | number | undefined> | FilteringQuery;
  fetchTotal?: TTL;
  headers?: Record<string, string>;
};

type FetchReturnCondType<T, TTL extends boolean> = TTL extends true ? FilteringResult<T> : T;

@injectable()
export class ApiService {
  public constructor(@inject(AppConfig) private appConfig: AppConfig) {}

  private async fetch<T, R = never, TTL extends boolean = false>({
    method,
    endpoint,
    data,
    query,
    fetchTotal,
    headers,
  }: FetchOpts<R, TTL>): Promise<FetchReturnCondType<T, TTL>> {
    if (query) {
      const searchParams: Record<string, string> = {};
      for (const [key, value] of Object.entries(query)) {
        if (value) {
          searchParams[key] = String(value);
        }
      }
      endpoint += '?' + new URLSearchParams(searchParams).toString();
    }
    const request: RequestInit = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    if (data) {
      request.body = JSON.stringify(data);
    }
    const url = this.appConfig.getApiBaseUrl() + '/' + endpoint;

    const res = await fetch(url, request);
    if (res.status < 200 || 299 < res.status) {
      alert(`API error ${res.status}`);
      return null as never;
    }
    try {
      const items = await res.json();
      if (fetchTotal) {
        return { total: Number(res.headers.get('X-Total')) || 0, items } as FetchReturnCondType<
          T,
          TTL
        >;
      }
      return items as FetchReturnCondType<T, TTL>;
    } catch (e) {
      alert(`Response parse error ${res.status}`);
      return null as never;
    }
  }

  public async getVersion(): Promise<string> {
    return (await this.fetch<{ version: string }>({ method: 'GET', endpoint: '' })).version;
  }
}
