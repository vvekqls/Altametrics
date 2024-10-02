import prisma from '../libs/prismadb'
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  const invoices = [
    {
      vendorName: 'Acme Corp',
      amount: 1000,
      dueDate: new Date('2024-12-31'),
      description: 'Office supplies',
      userId: user.id,
    },
    {
      vendorName: 'Kim Solutions',
      amount: 2500,
      dueDate: new Date('2024-11-30'),
      description: 'IT services',
      userId: user.id,
    },
    {
      vendorName: 'Beta Pros',
      amount: 1500,
      dueDate: new Date('2024-10-31'),
      description: 'Marketing campaign',
      userId: user.id,
    },
    {
      vendorName: 'Alta Corp',
      amount: 800,
      dueDate: new Date('2024-12-31'),
      description: 'Office supplies',
      userId: user.id,
    },
    {
      vendorName: 'Tech Solutions',
      amount: 2500,
      dueDate: new Date('2024-11-30'),
      description: 'IT services',
      userId: user.id,
    },
    {
      vendorName: 'Marketing Pros',
      amount: 1500,
      dueDate: new Date('2024-10-31'),
      description: 'Marketing campaign',
      userId: user.id,
    },
    {
      vendorName: 'Office Corp',
      amount: 1000,
      dueDate: new Date('2024-12-31'),
      description: 'Office supplies',
      userId: user.id,
    },
    {
      vendorName: 'Office Solutions',
      amount: 2500,
      dueDate: new Date('2024-11-30'),
      description: 'IT services',
      userId: user.id,
    },
    {
      vendorName: 'Lim Pros',
      amount: 1500,
      dueDate: new Date('2024-10-31'),
      description: 'Marketing campaign',
      userId: user.id,
    },
    {
      vendorName: 'Lim Pros',
      amount: 122,
      dueDate: new Date('2024-10-31'),
      description: 'Marketing campaign',
      userId: user.id,
    },
    {
      vendorName: 'Lim Pros',
      amount: 1000,
      dueDate: new Date('2024-10-31'),
      description: 'Marketing campaign',
      userId: user.id,
    },
  ];

  for (const invoice of invoices) {
    await prisma.invoice.create({ data: invoice });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });