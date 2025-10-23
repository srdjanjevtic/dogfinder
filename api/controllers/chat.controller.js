import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  // console.log(req.userId);

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        users: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    // console.log("chats:", chats);
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Došlo je do greške!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Neuspelo ucitavanje!" });
  }
};

export const findUniqueChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.params.receiverId;
  // console.log(tokenUserId, receiverId);

  try {
    const found = await prisma.chat.findFirst({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId],
        },
      },
    });
    // console.log(found);
    res.status(200).json(found);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Doslo je do greske!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Neuspelo kreiranje!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Neuspelo ucitavanje!" });
  }
};

export const deleteChat = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (tokenUserId === process.env.ADMIN_ID) {
    try {
      await prisma.chat.delete({
        where: { id },
      });
      const chats = await prisma.chat.findMany({});
      res
        .status(200)
        .json({ message: `Chat id ${id} obrisan iz baze`, data: chats });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Neuspelo brisanje!" });
    }
  } else {
    return res.status(403).json({ message: "Nedozvoljeno!" });
  }
};

export const getAllChats = async (req, res) => {
  // const tokenUserId = req.userId;
  // console.log(req.userId);
  try {
    const chats = await prisma.chat.findMany({
      include: {
        users: {
          select: {
            username: true,
            avatar: true,
          },
        },
        messages: true,
      },
    });
    // console.log("chats:", chats);
    res.status(200).json(chats);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Doslo je do greske!" });
  }
};

export const getSingleChat = async (req, res) => {
  // const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        messages: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Neuspelo ucitavanje!" });
  }
};
