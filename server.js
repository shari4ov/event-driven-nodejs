import {EventEmitter} from 'events';
import {sendEmail} from "./email-service.js";
export class TicketService extends EventEmitter {
    constructor(client) {
        super();
        client.on('email', (email)=> {
            sendEmail(email)
        })
    }
}

