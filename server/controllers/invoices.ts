import { Request, Response } from 'express';
import prisma from '../libs/prismadb'

export const getAllInvoices = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const invoices = await prisma.invoice.findMany({
      skip,
      take: limit,
      include: { user: { select: { name: true } } },
    });
    const total = await prisma.invoice.count();

    res.json({
      data: invoices,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getInvoiceById = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
      include: { user: { select: { name: true } } },
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getInvoiceTotal = async (req: Request, res: Response) => {
  try {
    const result = await prisma.invoice.groupBy({
      by: ['dueDate'],
      _sum: {
        amount: true,
      },
      orderBy: {
        dueDate: 'asc'
        ,
      }
    });

    const totals = result.map((item: any) => ({
      dueDate: item.dueDate,
      totalAmount: item._sum.amount,
    }));

    res.json(totals);
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
};