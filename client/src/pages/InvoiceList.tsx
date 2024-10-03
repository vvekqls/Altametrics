import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import clsx from "clsx";
import { formattedDate } from "@/utils";

interface Invoice {
  id: number;
  vendorName: string;
  amount: number;
  dueDate: string;
  description: string;
  paid: boolean;
}

const DEFAULT_PAGE = 1;

const InvoiceList: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchParams] = useSearchParams();

  const page = +(searchParams.get("page") ?? DEFAULT_PAGE);

  const { data, isLoading, error } = useQuery({
    queryKey: ["invoices", page],
    queryFn: async (): Promise<{
      invoices: Invoice[];
      meta: { totalPages: number; total: number; limit: number };
    }> => {
      const response = await axios.get(`/api/invoices?page=${page}`);
      return response.data;
    },
  });

  const todayDate = new Date();

  const date = formattedDate(todayDate);

  useEffect(() => {}, [selectedInvoice]);

  const handleSelectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Dialog>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Payee</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.invoices.map((invoice: Invoice) => (
                      <DialogTrigger
                        key={invoice.id}
                        className="cursor-pointer"
                        asChild
                        onClick={() => handleSelectInvoice(invoice)}
                      >
                        <TableRow>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{date}</TableCell>
                          <TableCell>{invoice.vendorName}</TableCell>
                          <TableCell>{invoice.description}</TableCell>
                          <TableCell>
                            {invoice.dueDate &&
                              formattedDate(new Date(invoice.dueDate))}
                          </TableCell>
                          <TableCell>
                            {invoice.amount
                              ? `$${invoice.amount.toFixed(2)}`
                              : ""}
                          </TableCell>
                          <TableCell className="text-blue-600">
                            {invoice.paid ? "Paid" : "Open"}
                          </TableCell>
                        </TableRow>
                      </DialogTrigger>
                    ))}
                </TableBody>
              </Table>
              {data && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={clsx(
                          page - 1 === 0
                            ? "pointer-events-none opacity-50"
                            : undefined,
                          "cursor-pointer"
                        )}
                        to={`/invoices?page=${page <= 0 ? 1 : page - 1}`}
                      />
                    </PaginationItem>
                    {Array.from({ length: data.meta.totalPages ?? 1 }).map(
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            to={`/invoices?page=${index + 1}`}
                            isActive={page === index + 1}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        className={clsx(
                          page === data.meta.totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined,
                          "cursor-pointer"
                        )}
                        to={`/invoices?page=${
                          page === data.meta.totalPages ? page : page + 1
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>{selectedInvoice?.vendorName}</DialogTitle>
                <DialogDescription>
                  {selectedInvoice?.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedInvoice && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    {formattedDate(new Date(selectedInvoice?.dueDate))}
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  ${selectedInvoice?.amount}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  {selectedInvoice?.paid}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default InvoiceList;
