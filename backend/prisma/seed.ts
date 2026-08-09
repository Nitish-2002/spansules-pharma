import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5439/spansules?schema=public";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with dummy Spansules pharmacy admin data...');

  // 1. Create Default Theme
  const theme = await prisma.theme.upsert({
    where: { name: 'default-green' },
    update: {},
    create: {
      name: 'default-green',
      primaryColor: '#0f5132',
      secondaryColor: '#d1e7dd',
      backgroundColor: '#f8fafc',
      fontFamily: "'Outfit', sans-serif",
      isActive: true,
    },
  });
  console.log('Upserted default theme:', theme.name);

  // 2. Create Medicines (Store items representing different categories)
  const med1 = await prisma.medicine.upsert({
    where: { code: 'RAW-PA-101' },
    update: {},
    create: {
      name: 'Paracetamol Active Ingredient (Raw Powder)',
      code: 'RAW-PA-101',
      description: 'Used for manufacturing analgesic products',
      type: 'RAW_MATERIAL',
      unit: 'kg',
      quantity: 520.5,
      minStock: 100.0,
    },
  });

  const med2 = await prisma.medicine.upsert({
    where: { code: 'PKG-BX-202' },
    update: {},
    create: {
      name: 'Cardboard Box Packaging 500mg (10x10 Strips)',
      code: 'PKG-BX-202',
      description: 'Outer packing cardboard boxes',
      type: 'PACKAGING',
      unit: 'pcs',
      quantity: 8500,
      minStock: 1000,
    },
  });

  const med3 = await prisma.medicine.upsert({
    where: { code: 'SEM-GR-303' },
    update: {},
    create: {
      name: 'Ibuprofen Granules Compound',
      code: 'SEM-GR-303',
      description: 'Granulated mixture ready for compression',
      type: 'SEMI_FINISHED_GOODS',
      unit: 'kg',
      quantity: 15.0, // Alert: Low stock
      minStock: 50.0,
    },
  });

  const med4 = await prisma.medicine.upsert({
    where: { code: 'FIN-TA-404' },
    update: {},
    create: {
      name: 'Amoxicillin Capsules 500mg',
      code: 'FIN-TA-404',
      description: 'Finished antibiotic capsule strip packs',
      type: 'FINISHED_GOODS',
      unit: 'box',
      quantity: 1250,
      minStock: 200,
    },
  });

  const med5 = await prisma.medicine.upsert({
    where: { code: 'STA-PR-505' },
    update: {},
    create: {
      name: 'Printer A4 Billing Papers Group',
      code: 'STA-PR-505',
      description: 'Paper rolls for invoices printing',
      type: 'STATIONARY_ITEMS',
      unit: 'pack',
      quantity: 45,
      minStock: 10,
    },
  });

  const med6 = await prisma.medicine.upsert({
    where: { code: 'ENG-VA-606' },
    update: {},
    create: {
      name: 'Stainless Steel Compression Valve 2 inch',
      code: 'ENG-VA-606',
      description: 'Replacement valve for coating machine assembly',
      type: 'ENGINEERING_ITEMS',
      unit: 'pcs',
      quantity: 3,
      minStock: 2,
    },
  });

  console.log('Upserted Medicines inventory list.');

  // 3. Create Vendors
  const vendor1 = await prisma.vendor.upsert({
    where: { code: 'VEN-IND-701' },
    update: {},
    create: {
      name: 'Aurobindo Pharma Raw Supplies',
      code: 'VEN-IND-701',
      contact: 'Mr. Satish Kumar',
      email: 'supplies@aurobindo.com',
      phone: '+91 98480 22334',
      address: 'Industrial Area Phase 2, Hyderabad, TS, India',
    },
  });

  const vendor2 = await prisma.vendor.upsert({
    where: { code: 'VEN-GLO-702' },
    update: {},
    create: {
      name: 'Apex Global Packaging Ltd',
      code: 'VEN-GLO-702',
      contact: 'Ms. Clara Smith',
      email: 'orders@apexpkg.com',
      phone: '+1 415 555 0192',
      address: '422 Silicon Valley Blvd, San Francisco, CA, USA',
    },
  });

  console.log('Upserted Vendors.');

  // 4. Create Customers
  const customer1 = await prisma.customer.upsert({
    where: { code: 'CUS-AP-801' },
    update: {},
    create: {
      name: 'Apollo Pharmacy Group HQ',
      code: 'CUS-AP-801',
      contact: 'Procurement Cell',
      email: 'purchasing@apollo.com',
      phone: '+91 40 2360 8000',
      address: 'Film Nagar, Jubilee Hills, Hyderabad, TS, India',
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { code: 'CUS-MED-802' },
    update: {},
    create: {
      name: 'MedPlus Retail Outlets Inc',
      code: 'CUS-MED-802',
      contact: 'Dr. Srinivas Rao',
      email: 'inventory@medplus.com',
      phone: '+91 40 6718 6718',
      address: 'Gachibowli High Road, Hyderabad, TS, India',
    },
  });

  console.log('Upserted Customers.');

  // 5. Create active production Batches & Process steps
  const batch1 = await prisma.batch.upsert({
    where: { batchNumber: 'BAT-PA-501' },
    update: {},
    create: {
      batchNumber: 'BAT-PA-501',
      medicineId: med4.id, // Amoxicillin Finished
      quantity: 500,
      status: 'IN_PROCESS',
      inProcessSteps: {
        create: [
          { stepName: 'Mixing', status: 'COMPLETED', operator: 'Senior Technician Ramu' },
          { stepName: 'Granulation', status: 'COMPLETED', operator: 'Senior Technician Ramu' },
          { stepName: 'Compression', status: 'ACTIVE', operator: 'Operator Shiva' },
          { stepName: 'Coating', status: 'PENDING', operator: 'Operator Shiva' },
          { stepName: 'Packaging', status: 'PENDING', operator: 'Operator Shiva' },
        ],
      },
    },
  });

  const batch2 = await prisma.batch.upsert({
    where: { batchNumber: 'BAT-PA-502' },
    update: {},
    create: {
      batchNumber: 'BAT-PA-502',
      medicineId: med4.id,
      quantity: 1000,
      status: 'COMPLETED',
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // completed 2 days ago
      inProcessSteps: {
        create: [
          { stepName: 'Mixing', status: 'COMPLETED', operator: 'Senior Technician Ramu' },
          { stepName: 'Granulation', status: 'COMPLETED', operator: 'Senior Technician Ramu' },
          { stepName: 'Compression', status: 'COMPLETED', operator: 'Operator Shiva' },
          { stepName: 'Coating', status: 'COMPLETED', operator: 'Operator Shiva' },
          { stepName: 'Packaging', status: 'COMPLETED', operator: 'Operator Shiva' },
        ],
      },
    },
  });

  console.log('Upserted Production batches and active steps.');

  // 6. Create Purchase Orders (Vendor supplies raw materials) -> automatically inserts AP
  const purchase1 = await prisma.purchase.upsert({
    where: { poNumber: 'PO-RAW-901' },
    update: {},
    create: {
      poNumber: 'PO-RAW-901',
      vendorId: vendor1.id,
      orderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      totalAmount: 18500,
      status: 'DELIVERED',
      items: {
        create: [
          {
            medicineId: med1.id, // raw powder
            quantity: 100,
            price: 185,
            total: 18500,
          },
        ],
      },
      accountPayable: {
        create: {
          amount: 18500,
          paidAmount: 18500,
          dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
          status: 'PAID',
        },
      },
    },
  });

  const purchase2 = await prisma.purchase.upsert({
    where: { poNumber: 'PO-PKG-902' },
    update: {},
    create: {
      poNumber: 'PO-PKG-902',
      vendorId: vendor2.id,
      orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // yesterday
      totalAmount: 24000,
      status: 'PENDING',
      items: {
        create: [
          {
            medicineId: med2.id, // cardboard packaging
            quantity: 12000,
            price: 2.0,
            total: 24000,
          },
        ],
      },
      accountPayable: {
        create: {
          amount: 24000,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
          status: 'UNPAID',
        },
      },
    },
  });

  console.log('Upserted Purchases and Accounts Payable.');

  // 7. Create Sales Invoices -> automatically inserts AR
  const sale1 = await prisma.sale.upsert({
    where: { invoiceNumber: 'INV-FIN-951' },
    update: {},
    create: {
      invoiceNumber: 'INV-FIN-951',
      customerId: customer1.id,
      saleDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      totalAmount: 52000,
      status: 'PAID',
      items: {
        create: [
          {
            name: 'Amoxicillin Capsules 500mg - Finished Batch Lot A',
            quantity: 100,
            price: 520,
            total: 52000,
          },
        ],
      },
      accountReceivable: {
        create: {
          amount: 52000,
          paidAmount: 52000,
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          status: 'PAID',
        },
      },
    },
  });

  const sale2 = await prisma.sale.upsert({
    where: { invoiceNumber: 'INV-FIN-952' },
    update: {},
    create: {
      invoiceNumber: 'INV-FIN-952',
      customerId: customer2.id,
      saleDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // yesterday
      totalAmount: 66380,
      status: 'UNPAID',
      items: {
        create: [
          {
            name: 'Generic Paracetamol Tablet Blisters - Bulk Pack B',
            quantity: 200,
            price: 331.9,
            total: 66380,
          },
        ],
      },
      accountReceivable: {
        create: {
          amount: 66380,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: 'UNPAID',
        },
      },
    },
  });

  console.log('Upserted Sales Invoices and Accounts Receivable.');
  console.log('Seeding script completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
