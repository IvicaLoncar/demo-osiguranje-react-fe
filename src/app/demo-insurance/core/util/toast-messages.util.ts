import { toast } from 'react-toastify';
import { getToastOptions } from '../config/toast-options.config';
import { CustomMessage } from '../models/custom-message.model';


export function toastMessages(messages: CustomMessage[])
{
  if (messages !== undefined)
  {
    for (let i = 0; i < messages.length; i++)
    {
      switch(messages[i].level.trim().toUpperCase()) 
      { 
        case "success".trim().toUpperCase(): { toast.info((messages[i] !== undefined ? messages[i].messages[0].message : "nema poruke"), getToastOptions()); break; } 
        case "error".trim().toUpperCase(): { toast.error((messages[i] !== undefined ? messages[i].messages[0].message : "nema poruke"), getToastOptions()); break; } 
        default: { toast((messages[i] !== undefined ? messages[i].messages[0].message : "nema poruke"), getToastOptions()); break;}
      } 
    }
  }
}

