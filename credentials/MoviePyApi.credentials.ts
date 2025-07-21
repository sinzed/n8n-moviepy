import { ICredentialType, INodeProperties } from 'n8n-workflow';

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
} 