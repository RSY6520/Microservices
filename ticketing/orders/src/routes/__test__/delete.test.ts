import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { app } from '../../app';
import { Order } from '../../models/order';
import { OrderStatus } from '@rstech/ticketing-common';

it('marks an order as cancelled', async () => {
    const ticket = Ticket.build({
        title: "dfxdds",
        price: 34
    });
    await ticket.save();

    const user = global.signin();

    const { body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id})
    .expect(201);

    await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder?.status).toEqual(OrderStatus.Canceelled);
})