import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.transaction.deleteMany({});
  await prisma.reservation.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample users
  const hashedPassword = await bcrypt.hash('123456', 10);

  const provider = await prisma.user.create({
    data: {
      name: 'João Silva',
      nif: '12345678901',
      email: 'provider@test.com',
      password: hashedPassword,
      role: 'SERVICE_PROVIDER',
      balance: 1000,
    },
  });

  const client = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      nif: '98765432101',
      email: 'client@test.com',
      password: hashedPassword,
      role: 'CLIENT',
      balance: 5000,
    },
  });

  // Create sample services
  const service1 = await prisma.service.create({
    data: {
      title: 'Limpeza de Casa',
      description: 'Serviço completo de limpeza residencial',
      price: 150,
      providerId: provider.id,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      title: 'Reparo Elétrico',
      description: 'Reparos e manutenção elétrica em geral',
      price: 200,
      providerId: provider.id,
    },
  });

  const service3 = await prisma.service.create({
    data: {
      title: 'Consultoria de TI',
      description: 'Consultoria em tecnologia da informação',
      price: 300,
      providerId: provider.id,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Provider:', provider);
  console.log('Client:', client);
  console.log('Services created:', [service1, service2, service3].length);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
