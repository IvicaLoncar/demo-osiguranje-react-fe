import { CustomMetadata, dummyCustomMetadata } from './custom-metadata.model';
import { CustomMessage } from './custom-message.model';


export interface CustomData 
{
	metadata: CustomMetadata;
	data: any;
  messages: CustomMessage[];
}


export function dummyCustomData(): CustomData
{
  return {
    metadata: dummyCustomMetadata(),
    data: undefined,
    messages: []
  };
}