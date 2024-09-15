'use client';

import React, { useEffect, useState } from 'react';
import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header';
import Notifications from '@/components/Notifications';
import { Button } from '@/components/ui/button';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

// Define the type for your document data
type Document = {
  id: string;
  metadata: {
    title: string;
    Client: string;
    SiteConstruction: string;
    SubContractor: string;
    PlateNumber: string;
    Date: string;
    SizeAxis: string;
    FromTime: string;
    Totime: string;
    HSimple: string;
    HDouble: string;
    TTripSimple: string;
    TTripDouble: string;
    InfoTrip: string;
    AcceptedBy: string;
  };
  createdAt: string;
};

const columnHelper = createColumnHelper<Document>();

const columns = [
  columnHelper.accessor('metadata.title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.Client', {
    header: 'Client',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.SiteConstruction', {
    header: 'Site Construction',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.SubContractor', {
    header: 'Sub Contractor',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.PlateNumber', {
    header: 'Plate Number',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.Date', {
    header: 'Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.SizeAxis', {
    header: 'Size Axis',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.FromTime', {
    header: 'From Time',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.Totime', {
    header: 'To Time',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.HSimple', {
    header: 'H Simple',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.HDouble', {
    header: 'H Double',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.TTripSimple', {
    header: 'T Trip Simple',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.TTripDouble', {
    header: 'T Trip Double',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.InfoTrip', {
    header: 'Info Trip',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('metadata.AcceptedBy', {
    header: 'Accepted By',
    cell: info => info.getValue(),
  }),
];

const TableView = ({ data }: { data: Document[] }) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

interface UserData {
    id: string;
    email: string;
}

const HomeClient = ({ userData, roomDocuments }: { userData: UserData, roomDocuments: any }) => {
    const [isTableView, setIsTableView] = useState(false);
  
    // Use roomDocuments.data for the list view
    const listData = roomDocuments.data;
    // Use fakeData for the table view
    const tableData = roomDocuments.data;

    useEffect( () => {
      console.log("tableData: ",tableData)
    }, [tableData])
  
    return (
      <main className="home-container p-4">
        <Header className="sticky left-0 top-0">
          <div className="flex items-center gap-2 lg:gap-4">
            <Notifications />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        {listData.length > 0 ? (
          <div className="document-list-container max-w-7xl mx-auto">
            <div className="document-list-title flex justify-between items-center mb-4">
              <h3 className="text-28-semibold">All documents</h3>
              <div className="flex gap-2">

                <AddDocumentBtn 
                  userId={userData.id}
                  email={userData.email}
                />
              </div>

            </div>

            <div>
              <Button onClick={() => setIsTableView(!isTableView)}>
                  {isTableView ? 'Timesheets' : 'Table Info'}
                </Button>
            </div>
            
            {/* Table View (Demo) */}
            <div className={isTableView ? '' : 'hidden'}>
              <TableView data={tableData} />
              <p className="text-sm text-gray-500 mt-2">Note: This table shows the data from the actual documents.</p>
            </div>
  
            {/* List View (Actual Data) */}
            <div className={isTableView ? 'hidden' : ''}>
              <ul className="document-ul">
                {listData.map(({ id, metadata, createdAt }: any) => (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                      <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                        <Image 
                          src="/assets/icons/doc.svg"
                          alt="file"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="line-clamp-1 text-lg">{metadata.title}</p>
                        <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                    <DeleteModal roomId={id} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="document-list-empty text-center">
            <Image 
              src="/assets/icons/doc.svg"
              alt="Document"
              width={40}
              height={40}
              className="mx-auto mb-4"
            />
            <AddDocumentBtn 
              userId={userData.id}
              email={userData.email}
            />
          </div>
        )}
      </main>
    );
  };

export default HomeClient;