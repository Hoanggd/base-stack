'use client';

import { getPayments, Payment } from '@/actions/examples/payments';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@workspace/ui/components/button';
import {
  DataTable,
  DataTableSorting,
  DataTableSortingSchema,
} from '@workspace/ui/components/DataTable';
import {
  Pagination,
  PaginationPageSizeSelector,
} from '@workspace/ui/components/pagination';
import { BsSearchField } from '@workspace/ui/components/searchfield';
import { BsSelect } from '@workspace/ui/components/select';
import { XIcon } from 'lucide-react';
import {
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryState,
} from 'nuqs';
import { useState } from 'react';

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    size: 270,
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
  },
  {
    accessorKey: 'transactionDate',
    header: 'Transaction Date',
  },
  {
    accessorKey: 'paymentReference',
    header: 'Payment Reference',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => <div>Actions</div>,
    size: 100,
    enableSorting: false,
  },
];

export function DataTableDemo() {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<DataTableSorting | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState('');
  const isFiltering = search || paymentMethod;

  const payments = useQuery({
    queryKey: ['payments', sorting, page, pageSize, paymentMethod, search],
    queryFn: () =>
      getPayments({ ...sorting, page, pageSize, paymentMethod, search }),
    placeholderData: keepPreviousData,
  });

  const handleClearFilters = () => {
    setSearch('');
    setPaymentMethod('');
    setPage(1);
  };

  return (
    <div className='w-full space-y-3'>
      <div className='flex gap-2'>
        <BsSearchField
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <BsSelect
          value={paymentMethod}
          onChange={(value) => {
            setPaymentMethod(value || '');
            setPage(1);
          }}
          className='w-[155px]'
          placeholder='Payment Method'
          options={[
            { id: 'debit_card', name: 'Debit Card' },
            { id: 'credit_card', name: 'Credit Card' },
            { id: 'bank_transfer', name: 'Bank Transfer' },
          ]}
        />
        {isFiltering && (
          <Button variant='outline' onClick={handleClearFilters}>
            <XIcon />
            Clear
          </Button>
        )}
      </div>
      <DataTable
        enableSorting
        enableRowSelection
        containerClassName='h-[450px]'
        sorting={sorting}
        setSorting={setSorting}
        columns={columns}
        data={payments.data?.items ?? []}
        isLoading={payments.isLoading}
        isFetching={payments.isFetching}
      />
      <div className='flex gap-4 justify-between'>
        <PaginationPageSizeSelector
          value={pageSize}
          onChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />
        <Pagination
          value={page}
          onChange={setPage}
          pageCount={payments.data?.meta.totalPages ?? 1}
        />
      </div>
    </div>
  );
}
