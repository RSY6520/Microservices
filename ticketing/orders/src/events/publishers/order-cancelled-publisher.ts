import { OrderCancelledEvent, Publisher, Subjects } from "@rstech/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}