import React, { useState } from "react";
import { Bell, Settings, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
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
  );
};
