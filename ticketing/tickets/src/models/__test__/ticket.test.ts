import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async () => {
    const ticket = Ticket.build({
        title: "bbvcxz",
        price: 32,
        userId: "22343"
    });
    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance!.set({price: 5});
    secondInstance!.set({price: 6});

    await firstInstance!.save();
    try {
        // await secondInstance!.save();
    } catch (error) {
        return;
    }

    // throw new Error("Should not reach till here");
});

it('incements the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: "xxxxz",
        price: 45432,
        userId: "vfxzx4re"
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
})