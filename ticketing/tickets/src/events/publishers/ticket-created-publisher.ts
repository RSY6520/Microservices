import { Publisher, Subjects, TicketCreatedEvent } from "@rstech/ticketing-common";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export { TicketCreatedPublisher };