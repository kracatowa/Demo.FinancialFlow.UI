import type { Account, BalanceSnapshot, DashboardData } from "./dashboardService";

export function calculateCurrencyDistribution(
    accounts: Account[],
    balanceSnapshots: BalanceSnapshot[],
    fxRates: DashboardData["fxRates"],
    baseCurrency: string,
    totalBalance: number): { [key: string]: number } {
    const snapshotsWithAccounts = balanceSnapshots.map(snapshot => {
      const account = accounts.find(acc => acc.id === snapshot.account_id) || null;
      return { ...snapshot, account };
    });

    const uniqueCurrencies = Array.from(new Set(accounts.map(acc => acc.currency)));
    const currencySums: { [key: string]: number } = {};

    uniqueCurrencies.forEach(currency => {
      const sum = snapshotsWithAccounts.reduce((acc, item) => {
        if (item.account?.currency !== currency) return acc;

        if (currency === baseCurrency) {
          return acc + item.book;
        } else {
          const exchangeRate = fxRates.find(
            rate => rate.from_ccy === currency && rate.to_ccy === baseCurrency
          )?.rate;
          return acc + item.book * (exchangeRate ?? 1);
        }
      }, 0);

      currencySums[currency] = totalBalance > 0
        ? Math.round((sum / totalBalance) * 100)
        : 0;
    });

    return currencySums;
  }