import { OrderCreatedEvent, Publisher, Subjects } from "@rstech/ticketing-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}