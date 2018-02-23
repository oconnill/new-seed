import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
    message: Message;

    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        const message = new Message(form.value.content, 'Max');
        this.messageService.addMessage(message)
        .subscribe(
            result => console.log(result)
        );
        form.resetForm();
    }
}


