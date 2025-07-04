/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useDataTable from "../hooks/useDataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const columnHelper = createColumnHelper<any>();

const sampleData = [
  { id: 1, name: "Alice", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob", email: "bob@example.com", status: "Inactive" },
  { id: 3, name: "Charlie", email: "charlie@example.com", status: "Active" },
  { id: 4, name: "Daisy", email: "daisy@example.com", status: "Active" },
  { id: 5, name: "Eve", email: "eve@example.com", status: "Inactive" },
];

const sampleInventory = [
  {
    id: 1,
    name: "Red T-shirt",
    sku: "TSH-001",
    quantity: 120,
    price: 15.99,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Blue Jeans",
    sku: "JNS-002",
    quantity: 40,
    price: 39.99,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Black Hoodie",
    sku: "HD-003",
    quantity: 0,
    price: 29.99,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "White Cap",
    sku: "CAP-004",
    quantity: 18,
    price: 9.99,
    status: "In Stock",
  },
];

const PAGE_SIZE = 2;

export default function HomePage() {
  const [pageUser, setPageUser] = useState(1);
  const [pageInventory, setPageInventory] = useState(1);

  const pagedUserData = useMemo(() => {
    const start = (pageUser - 1) * PAGE_SIZE;
    return sampleData.slice(start, start + PAGE_SIZE);
  }, [pageUser]);

  const pagedInventoryData = useMemo(() => {
    const start = (pageInventory - 1) * PAGE_SIZE;
    return sampleInventory.slice(start, start + PAGE_SIZE);
  }, [pageInventory]);

  const userColumns: ColumnDef<any>[] = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <span
              className={value === "Active" ? "text-green-600" : "text-red-500"}
            >
              {value}
            </span>
          );
        },
      }),
    ],
    []
  );

  const handleEdit = (item: any) => {
    console.log("Edit:", item);
    // mở modal hoặc push router tới trang edit
  };

  const handleDelete = (item: any) => {
    console.log("Delete:", item);
    // hiện confirm rồi gọi API xóa
  };

  const inventoryColumns: ColumnDef<any>[] = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Product Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("sku", {
        header: "SKU",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("quantity", {
        header: "Quantity",
        enableSorting: false,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: "Price ($)",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const value = info.getValue();
          let color = "text-gray-600";
          if (value === "In Stock") color = "text-green-600";
          else if (value === "Low Stock") color = "text-yellow-600";
          else if (value === "Out of Stock") color = "text-red-600";

          return <span className={color}>{value}</span>;
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const { DataTable: UserTable } = useDataTable({
    data: pagedUserData,
    columns: userColumns,
    isLoading: false,
    totalPages: Math.ceil(sampleData.length / PAGE_SIZE),
    totalCount: sampleData.length,
    currentPage: pageUser,
    onPageChange: setPageUser,
  });

  const { DataTable: InventoryTable } = useDataTable({
    data: pagedInventoryData,
    columns: inventoryColumns,
    isLoading: false,
    totalPages: Math.ceil(sampleInventory.length / PAGE_SIZE),
    totalCount: sampleInventory.length,
    currentPage: pageInventory,
    onPageChange: setPageInventory,
  });

  return (
    <div className="p-6 space-y-10">
      <section>
        <h1 className="text-xl font-bold mb-4">User Table</h1>
        <UserTable />
      </section>

      <section>
        <h1 className="text-xl font-bold mb-4">Inventory Table</h1>
        <InventoryTable />
      </section>
    </div>
  );
}
