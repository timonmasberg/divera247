import axios, { AxiosError, AxiosHeaders } from 'axios';
import { DiveraResponse } from './endpoints/divera-response.model';
import { BaseClient } from './base-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

class TestEndpointImpl extends BaseClient {
  proxyPost(resourcePath: string, payload: unknown): Promise<DiveraResponse> {
    return this.post(resourcePath, payload);
  }

  proxyGet(resourcePath: string): Promise<DiveraResponse> {
    return this.get(resourcePath);
  }

  proxyPatch(resourcePath: string, payload: unknown): Promise<DiveraResponse> {
    return this.patch(resourcePath, payload);
  }

  proxyPut(resourcePath: string, payload: unknown): Promise<DiveraResponse> {
    return this.put(resourcePath, payload);
  }

  proxyDelete(resourcePath: string): Promise<DiveraResponse> {
    return this.delete(resourcePath);
  }

  constructor(accessKey: string) {
    super(accessKey);
  }
}

// we want to ensure the BaseClass can be trusted with the HTTP layer behaviour, thats why we will expose
// the protected methods here and test them like they would be used in an endpoint class.
// Also, we want to validate the axios integration
describe('BaseClient', () => {
  let client: TestEndpointImpl;
  const accessKey = 'test-access-key';

  beforeEach(() => {
    client = new TestEndpointImpl(accessKey);
    mockedAxios.isAxiosError.mockImplementation(
      jest.requireActual('axios').isAxiosError,
    );
    mockedAxios.AxiosError.mockImplementation(
      jest.requireActual('axios').AxiosError,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should correctly handle requests', async () => {
    const resourcePath = 'v2/some-endpoint';
    const payload = { foo: 'bar' };

    const mockResponse: DiveraResponse = Object.freeze({
      success: true,
      data: { result: 'success' },
      ucr: 0,
    });

    mockedAxios.post.mockResolvedValue({ data: mockResponse });
    mockedAxios.get.mockResolvedValue({ data: mockResponse });
    mockedAxios.put.mockResolvedValue({ data: mockResponse });
    mockedAxios.patch.mockResolvedValue({ data: mockResponse });
    mockedAxios.delete.mockResolvedValue({ data: mockResponse });

    // POST
    const postResponse = await client.proxyPost(resourcePath, payload);
    expect(postResponse).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `https://app.divera247.com/api/${resourcePath}`,
      payload,
      { params: { accesskey: accessKey } },
    );

    // GET
    const getResponse = await client.proxyGet(resourcePath);
    expect(getResponse).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://app.divera247.com/api/${resourcePath}`,
      { params: { accesskey: accessKey } },
    );

    // PATCH
    const patchResponse = await client.proxyPatch(resourcePath, payload);
    expect(patchResponse).toEqual(mockResponse);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `https://app.divera247.com/api/${resourcePath}`,
      payload,
      { params: { accesskey: accessKey } },
    );

    // PUT
    const putResponse = await client.proxyPut(resourcePath, payload);
    expect(putResponse).toEqual(mockResponse);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `https://app.divera247.com/api/${resourcePath}`,
      payload,
      { params: { accesskey: accessKey } },
    );

    // DELETE
    const deleteResponse = await client.proxyDelete(resourcePath);
    expect(deleteResponse).toEqual(mockResponse);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `https://app.divera247.com/api/${resourcePath}`,
      { params: { accesskey: accessKey } },
    );
  });

  it('should handle divera errors', async () => {
    const diveraError = Object.freeze({
      success: false,
      error: '3',
      errors: ['Rolle des Benutzers wird nicht unterstützt'],
    });

    mockedAxios.post.mockRejectedValueOnce(
      new AxiosError(
        'oh no',
        '400',
        {
          headers: new AxiosHeaders(),
        },
        {},
        {
          data: diveraError,
          config: {
            headers: new AxiosHeaders(),
          },
          headers: new AxiosHeaders(),
          status: 400,
          statusText: 'Bad Request',
        },
      ),
    );

    const responseDiveraError = await client.proxyPost('v2/some-endpoint', {});
    expect(responseDiveraError).toEqual(diveraError);
  });

  it('should handle client errors', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('oh no'));

    const responseCustomError = await client.proxyPost('v2/some-endpoint', {});
    expect(responseCustomError).toEqual({
      success: false,
      error: 'oh no',
    });
  });

  it('should handle unknown errors', async () => {
    mockedAxios.post.mockRejectedValueOnce('oh no');

    const unknownErrorResponse = await client.proxyPost('v2/some-endpoint', {});
    expect(unknownErrorResponse).toEqual({
      success: false,
      error: 'Unknown Error',
    });
  });
});
