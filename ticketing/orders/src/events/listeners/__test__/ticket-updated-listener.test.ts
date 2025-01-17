import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-updated-listener"
import { TicketUpdatedEvent } from "@rstech/ticketing-common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "fcxfvcxx",
        price: 434
    });

    await ticket.save();

    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: "dfdds",
        price: 34,
        userId: "ffxxdffd"
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg, ticket }
}

it('finds, updates, and saves a ticket', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call the ack if the version has skipped number', async () => {
    const { listener, data, msg, ticket } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (error) {
        
    }

    expect(msg.ack).not.toHaveBeenCalled();
})