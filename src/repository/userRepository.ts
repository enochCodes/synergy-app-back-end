import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';


const prisma = new PrismaClient();
export const createUser = async (data: { email: string; password: string; role?: string }) => {
  return await prisma.user.create({
    data,
  });
};


export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (id: number, data: Partial<{ email: string; password: string; role: string }>) => {
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
