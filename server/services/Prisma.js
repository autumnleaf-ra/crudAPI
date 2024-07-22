const { PrismaClient } = require('@prisma/client');
const CommonHelper = require('../helpers/CommonHelper');

const prisma = new PrismaClient();

const executePrismaOperation = async (operationName, operationFunction) => {
  try {
    const timeStart = process.hrtime();
    const data = await operationFunction();
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', operationName, 'INFO'], {
      message: { timeTaken },
      data
    });
    prisma.$disconnect();
    return data;
  } catch (error) {
    prisma.$disconnect();
    if (error?.code === 'P2025') {
      // Handle the case where the record is not found
      CommonHelper.log(['Prisma', operationName, 'WARN'], {
        message: `No Helmet entry found`
      });
      return false;
    }
    // Log other errors
    CommonHelper.log(['Prisma', operationName, 'ERROR'], {
      message: `${error}`
    });
    throw error;
  }
};

const getListHelmet = async () =>
  executePrismaOperation('getListHelmet', () =>
    prisma.helmets.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        type: {
          select: {
            name: true
          }
        }
      }
    })
  );

const getTypeHelmet = async () => executePrismaOperation('getTypeHelmet', () => prisma.type.findMany());

const addHelmet = async (type, name, price, stock) => {
  await executePrismaOperation('addHelmet', async () => {
    await prisma.helmets.create({
      data: {
        type_id: Number(type),
        name,
        price,
        stock
      }
    });
  });
};

const editHelmet = async (id, price, stock) =>
  executePrismaOperation('editHelmet', async () => {
    const result = await prisma.helmets.update({
      where: {
        id: Number(id)
      },
      data: {
        price,
        stock
      }
    });
    return !!result;
  });

const deleteHelmet = async (id) =>
  executePrismaOperation('deleteHelmet', async () => {
    const result = await prisma.helmets.delete({
      where: {
        id: Number(id)
      }
    });
    return !!result;
  });

module.exports = { getListHelmet, getTypeHelmet, addHelmet, editHelmet, deleteHelmet };
