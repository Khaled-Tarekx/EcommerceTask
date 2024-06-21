import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    const newUser = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Deo',
        role: 'USER'
      },
    });
  
    console.log('Created new user:', newUser);
  }
  
  main()
    .catch(error => {
      throw error;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

export default prisma
