export async function fetchDashboardData() {
  const [api1, api2, api3] = await Promise.all([
    fetch('/api/balancesnapshots').then(res => res.json()),
    fetch('/api/accounts').then(res => res.json()),
    fetch('/api/fxrates').then(res => res.json())
  ]);

  return {
    balancessnapshots: api1.balancesnapshots,
    accounts: api2.accounts,
    fxr: api3.fxrates
  };
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