import { PaymentCreatedEvent, Publisher, Subjects } from "@rstech/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}