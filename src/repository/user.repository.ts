import { PrismaClient, Prisma } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();
export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};


export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
