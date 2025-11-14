export async function fetchDashboardData() : Promise<DashboardData> {
    const mockAccounts: Account[] = [
    { id: 'acc-1', bank: 'HSBC', entity: 'EU Subsidiary', currency: 'EUR', account_ref: '****5510', active: true },
    { id: 'acc-2', bank: 'HSBC', entity: 'EU Subsidiary', currency: 'USD', account_ref: '****9021', active: true },
    { id: 'acc-3', bank: 'RBC Canada', entity: 'Canada Retail', currency: 'CAD', account_ref: '****1122', active: true },
    { id: 'acc-4', bank: 'HSBC', entity: 'EU Subsidiary', currency: 'EUR', account_ref: '****3388', active: true },
    { id: 'acc-5', bank: 'HSBC', entity: 'EU Subsidiary', currency: 'USD', account_ref: '****5555', active: false },
    { id: 'acc-6', bank: 'RBC Canada', entity: 'Canada Retail', currency: 'CAD', account_ref: '****9999', active: true },
    { id: 'acc-7', bank: 'Bank of America', entity: 'North America Holding', currency: 'USD', account_ref: '****2143', active: true },
    { id: 'acc-8', bank: 'Bank of America', entity: 'North America Holding', currency: 'USD', account_ref: '****9932', active: true },
    { id: 'acc-9', bank: 'Bank of America', entity: 'North America Holding', currency: 'CAD', account_ref: '****7878', active: true },
    { id: 'acc-10', bank: 'Deutsche Bank', entity: 'EU Subsidiary', currency: 'EUR', account_ref: '****1234', active: true },
    { id: 'acc-11', bank: 'Deutsche Bank', entity: 'EU Subsidiary', currency: 'USD', account_ref: '****5678', active: false },
    { id: 'acc-12', bank: 'Santander', entity: 'EU Subsidiary', currency: 'EUR', account_ref: '****4321', active: true },
    { id: 'acc-13', bank: 'Santander', entity: 'EU Subsidiary', currency: 'USD', account_ref: '****8765', active: true },
    { id: 'acc-14', bank: 'Santander', entity: 'EU Subsidiary', currency: 'CAD', account_ref: '****2468', active: true },
    { id: 'acc-15', bank: 'RBC Canada', entity: 'Canada Retail', currency: 'USD', account_ref: '****1357', active: false },
    { id: 'acc-16', bank: 'RBC Canada', entity: 'Canada AR', currency: 'USD', account_ref: '****1388', active: false }
  ];

  const mockBalanceSnapshots: BalanceSnapshot[] = [
    { id: 'snap-1', account_id: 'acc-1', as_of_utc: '2025-11-07T00:00:00Z', book: 10500000, available: 10500000, source: 'HSBC' },
    { id: 'snap-2', account_id: 'acc-2', as_of_utc: '2025-11-07T00:00:00Z', book: 2170000, available: 2170000, source: 'HSBC' },
    { id: 'snap-3', account_id: 'acc-3', as_of_utc: '2025-11-07T00:00:00Z', book: 12000000, available: 12000000, source: 'RBC Canada' },
    { id: 'snap-4', account_id: 'acc-4', as_of_utc: '2025-11-07T00:00:00Z', book: 700500, available: 700500, source: 'HSBC' },
    { id: 'snap-5', account_id: 'acc-5', as_of_utc: '2025-11-07T00:00:00Z', book: 500000, available: 500000, source: 'HSBC' },
    { id: 'snap-6', account_id: 'acc-6', as_of_utc: '2025-11-07T00:00:00Z', book: 2500000, available: 2500000, source: 'RBC Canada' },
    { id: 'snap-7', account_id: 'acc-7', as_of_utc: '2025-11-07T00:00:00Z', book: 12500000, available: 12500000, source: 'Bank of America' },
    { id: 'snap-8', account_id: 'acc-8', as_of_utc: '2025-11-07T00:00:00Z', book: 6400000, available: 6400000, source: 'Bank of America' },
    { id: 'snap-9', account_id: 'acc-9', as_of_utc: '2025-11-07T00:00:00Z', book: 2550000, available: 2550000, source: 'Bank of America' },
    { id: 'snap-10', account_id: 'acc-10', as_of_utc: '2025-11-07T00:00:00Z', book: 3200000, available: 3200000, source: 'Deutsche Bank' },
    { id: 'snap-11', account_id: 'acc-11', as_of_utc: '2025-11-07T00:00:00Z', book: 1500000, available: 1500000, source: 'Deutsche Bank' },
    { id: 'snap-12', account_id: 'acc-12', as_of_utc: '2025-11-07T00:00:00Z', book: 2100000, available: 2100000, source: 'Santander' },
    { id: 'snap-13', account_id: 'acc-13', as_of_utc: '2025-11-07T00:00:00Z', book: 1800000, available: 1800000, source: 'Santander' },
    { id: 'snap-14', account_id: 'acc-14', as_of_utc: '2025-11-07T00:00:00Z', book: 900000, available: 900000, source: 'Santander' },
    { id: 'snap-15', account_id: 'acc-15', as_of_utc: '2025-11-07T00:00:00Z', book: 500000, available: 500000, source: 'RBC Canada' },
    { id: 'snap-16', account_id: 'acc-16', as_of_utc: '2025-11-07T00:00:00Z', book: 600000, available: 600000, source: 'RBC Canada' }
  ];

  const mockFxRates: FxRate[] = [
    { as_of_utc: '2025-11-07T00:00:00Z', from_ccy: 'EUR', to_ccy: 'USD', rate: 1.07 },
    { as_of_utc: '2025-11-07T00:00:00Z', from_ccy: 'CAD', to_ccy: 'USD', rate: 0.73 },
    { as_of_utc: '2025-11-07T00:00:00Z', from_ccy: 'USD', to_ccy: 'EUR', rate: 0.93 },
    { as_of_utc: '2025-11-07T00:00:00Z', from_ccy: 'USD', to_ccy: 'CAD', rate: 1.36 }
  ];

  const [api1, api2, api3] = await Promise.all([
    Promise.resolve(mockBalanceSnapshots),
    Promise.resolve(mockAccounts),
    Promise.resolve(mockFxRates)
  ]);

  return {
    accounts: api2,
    balanceSnapshots: api1,
    fxRates: api3
  };
}

export interface DashboardData {
  accounts: Account[];
  balanceSnapshots: BalanceSnapshot[];
  fxRates: FxRate[];
}

export interface Account {
  id: string;
  bank: string;
  entity: string;
  currency: string;
  account_ref: string;
  active: boolean;
}

export interface BalanceSnapshot {
  id: string;
  account_id: string;
  as_of_utc: string;
  book: number;
  available: number;
  source: string;
}

export interface FxRate {
  as_of_utc: string;
  from_ccy: string;
  to_ccy: string;
  rate: number;
}