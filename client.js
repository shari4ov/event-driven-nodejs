
import {EventEmitter} from 'events';
import { createInterface } from 'readline';
import chalk from 'chalk'
import figlet from "figlet";
import {TicketService} from "./server.js";
figlet("Event-Driven",(err,data) => {
    if (err) {
        console.log("something went wrong...")
        return
    }
    console.log(data)
    console.log(chalk.blue(">HELP: 1"))
    console.log(chalk.green(">BUY A TICKET: 2"))
})

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new EventEmitter();
const server = new TicketService(client)
server.on('response',(response)=> {
    console.log(`Response: ${response}`)
})

rl.on('line', (input)=> {
    switch (input) {
        case "1":
            console.log("help")
            return;
        case "2":
            rl.question(chalk.blackBright("Enter email: "), (answer) => {
                client.emit("email", answer)
            })
            return;
    }
})