import React from "react";

export const Sidebar: React.FC = () => {
  return (
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
  );
};
