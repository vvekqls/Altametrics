import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./components/ui/checkbox";
import { Input } from "./components/ui/input";
import { Bell, Settings, Moon } from "lucide-react";

const invoices = [
  {
    id: 1,
    date: "09/11/23",
    payee: "Amazon",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: null,
    status: "Paid",
  },
  {
    id: 2,
    date: "09/11/23",
    payee: "Sysco",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: 228.75,
    status: "Open",
  },
  {
    id: 3,
    date: "09/11/23",
    payee: "US Foods",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: null,
    status: "Paid",
  },
  {
    id: 4,
    date: "09/11/23",
    payee: "Retal Inc",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: null,
    status: "Paid",
  },
  {
    id: 5,
    date: "09/11/23",
    payee: "Fiber Optics",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: 150,
    status: "Open",
  },
  {
    id: 6,
    date: "09/11/23",
    payee: "Ikea",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: null,
    status: "Paid",
  },
  {
    id: 7,
    date: "09/11/23",
    payee: "Costco",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: null,
    status: "Paid",
  },
  {
    id: 8,
    date: "09/11/23",
    payee: "Office Depot",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: null,
    status: "Paid",
  },
  {
    id: 9,
    date: "09/11/23",
    payee: "Sysco",
    description: "Rental",
    dueDate: "10/31/2023",
    amount: 350,
    status: "Open",
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="text-2xl font-bold mb-8">LOGO</div>
          <nav>
            <ul className="space-y-2">
              <li className="py-2 px-4 hover:bg-gray-200">Home</li>
              <li className="py-2 px-4 bg-blue-100 text-blue-600">Invoices</li>
              <li className="py-2 px-4 hover:bg-gray-200">Bills</li>
              <li className="py-2 px-4 hover:bg-gray-200">Expenses</li>
              <li className="py-2 px-4 hover:bg-gray-200">Reports</li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">Invoices</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Bell className="h-6 w-6 text-gray-400" />
              <Settings className="h-6 w-6 text-gray-400" />
              <Moon className="h-6 w-6 text-gray-400" />
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Invoice table */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
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
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.payee}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      {invoice.amount ? `$${invoice.amount.toFixed(2)}` : ""}
                    </TableCell>
                    <TableCell
                      className={
                        invoice.status === "Paid"
                          ? "text-green-600"
                          : "text-blue-600"
                      }
                    >
                      {invoice.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
