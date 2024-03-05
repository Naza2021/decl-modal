export class CustomEvent extends Event {
    constructor(message, data) {
        super(message, data)
        this.detail = data.detail
    }
}