import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat)
      return res.status(404).json({ message: "Prepiska nije pronadjena!" });

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
        messages: {
          connect: {
            id: message.id,
          },
        },
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};

export const deleteMessage = async (req, res) => {
  const id = req.params.messageId;
  console.log(req.params);
  const tokenUserId = req.userId;
  try {
    if (tokenUserId !== process.env.ADMIN_ID) {
      return res.status(403).json({ message: "Nedozvoljeno!" });
    }
    const message = await prisma.message.findUnique({
      where: { id },
    });
    if (!message) {
      return res.status(404).json({ message: "Poruka nije pronadjena" });
    }
    await prisma.message.delete({
      where: { id },
    });
    res.status(200).json({ message: "Poruka obrisana" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Neuspelo brisanje" });
  }
};
