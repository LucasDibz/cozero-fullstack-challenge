import { BACKEND_URL } from '../constants/backend.constants';

class HTTPService {
  public async get<T>(props: {
    path: string;
    query?: string;
    jwtToken?: string;
  }): Promise<T | undefined> {
    const { path, jwtToken, query } = props;

    let url = `${BACKEND_URL}/${path}`;

    if (query) {
      url += `?${new URLSearchParams({ search: query }).toString()}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
        },
      });
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }

  public async post<T>(
    path: string,
    data: any,
    jwtToken?: string,
  ): Promise<T | undefined> {
    try {
      const response = await fetch(`${BACKEND_URL}/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }

  public async put<T>(path: string, data: any, jwtToken?: string): Promise<T> {
    const response = await fetch(`${BACKEND_URL}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  public async delete<T>(path: string, jwtToken?: string): Promise<T> {
    const response = await fetch(`${BACKEND_URL}/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
      },
    });
    return response.json();
  }
}

export default new HTTPService();
