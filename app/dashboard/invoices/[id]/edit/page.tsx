import { notFound } from 'next/navigation';
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    let [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
      ]);
      if (!invoice) {
        notFound();
      }
      
    if(invoice === undefined) {invoice = {id:id, customer_id:"", amount: 0, status: 'pending'}}
      console.log(invoice);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}