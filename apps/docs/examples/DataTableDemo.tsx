'use client';

import { getPayments, Payment } from '@/actions/examples/payments';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@workspace/ui/components/button';
import {
  DataTable,
  DataTableSortingSchema,
} from '@workspace/ui/components/DataTable';
import {
  Pagination,
  PaginationPageSelector,
} from '@workspace/ui/components/pagination';
import { BsSearchField } from '@workspace/ui/components/searchfield';
import { BsSelect } from '@workspace/ui/components/select';
import { XIcon } from 'lucide-react';
import { parseAsJson, useQueryState } from 'nuqs';

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
  }
];

export function DataTableDemo() {
  const [sorting, setSorting] = useQueryState(
    'sorting',
    parseAsJson(DataTableSortingSchema)
  );

  const payments = useQuery({
    queryKey: ['payments', sorting || {}],
    queryFn: () => getPayments(sorting),
    placeholderData: keepPreviousData,
  });

  return (
    <div className='w-full space-y-3'>
      <div className='flex gap-2'>
        <BsSearchField />
        <BsSelect
          className='w-[155px]'
          placeholder='Payment Method'
          options={[
            { id: 'debit_card', name: 'Debit Card' },
            { id: 'credit_card', name: 'Credit Card' },
            { id: 'bank_transfer', name: 'Bank Transfer' },
          ]}
        />
        <Button variant='outline'>
          <XIcon />
          Clear
        </Button>
      </div>
      <DataTable
        enableSorting
        enableRowSelection
        containerClassName='h-[450px]'
        sorting={sorting}
        setSorting={setSorting}
        columns={columns}
        data={payments.data ?? []}
        isLoading={payments.isLoading}
        isFetching={payments.isFetching}
      />
      <div className='flex gap-4 justify-between'>
        <PaginationPageSelector />
        <Pagination pageCount={10} />
      </div>
    </div>
  );
}
