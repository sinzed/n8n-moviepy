import { ICredentialType, INodeProperties, IHttpRequestMethods } from 'n8n-workflow';

export class MoviePyApi implements ICredentialType {
  name = 'moviePyApi';
  displayName = 'MoviePy API';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
    },
  ];

  test = {
    request: {
      method: 'POST' as IHttpRequestMethods,
      url: 'https://your-fixed-api-url.com/endpoint', // Replace with your real endpoint
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '=Bearer {{$credentials.apiKey}}',
      },
      body: {
        operation: 'test', // Adjust as needed for your API
      },
      json: true,
    },
  };
} 