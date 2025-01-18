import { OrderCreatedEvent, OrderStatus } from "@rstech/ticketing-common";
import { natsWrapper } from "../../../nats-wrapper"
import { OrederCreatedListener } from "../order-created-listener"
import mongoose from "mongoose";
import { Order } from "../../../models/order";

const setup = async () => {
    const listener = new OrederCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: "fgfgfd",
        userId: "fhhgfdddxgf",
        status: OrderStatus.Created,
        ticket: {
            id: "gxfgfcx",
            price: 4343
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data,  msg }
}

it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

it('acks the msg', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});


