import mongoose from "mongoose";
import request from 'supertest'
import { app } from "../../app";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderStatus } from "@rstech/ticketing-common";

it('returns an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404)
});

it('returns an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 500
    });
    await ticket.save();
    const order = Order.build({
        ticket,
        userId: "fghhjk",
        status: OrderStatus.Created,
        expiresAt: new Date(),
    });
    await order.save();
    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400)
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 453
    });
    await ticket.save();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id})
    .expect(201);
});