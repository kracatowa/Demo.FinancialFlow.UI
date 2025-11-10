import type { TreeNode } from "primereact/treenode";
import type { DashboardData, Account } from "./dashboardService";

function groupAccountsByBank(accounts: Account[]) {
  const banks: { [bank: string]: Account[] } = {};
  accounts.forEach(acc => {
    if (!banks[acc.bank]) banks[acc.bank] = [];
    banks[acc.bank].push(acc);
  });
  return banks;
}

function getFxRateForCurrency(currency: string, fxRates: { from_ccy: string; rate: number }[]) {
    const fxRate = fxRates.find(fx => fx.from_ccy === currency);
    return fxRate ? fxRate.rate : 1;
}

export async function buildTreeNode(dashboardData: DashboardData): Promise<TreeNode[]> {
  const { accounts, balanceSnapshots } = dashboardData;
  const banks = groupAccountsByBank(accounts);

  return Object.entries(banks).map(([bankName, bankAccounts], bankIdx) => ({
    key: `${bankIdx}`,
    data: {
      name: bankName,
      balance: bankAccounts
        .map(acc => {
          const snap = balanceSnapshots.find(s => s.account_id === acc.id);

          const fxrates = getFxRateForCurrency(acc.currency, dashboardData.fxRates);
          return snap ? (snap.book * fxrates) : 0;
        })
        .reduce((a, b) => Math.round((a + b) / 1000) * 1000 , 0)
        .toLocaleString(),
      lcybalance: '-',
      lcy: '-'
    },
    children: [
      {
        key: `${bankIdx}-0`,
        data: {
          name: `${bankAccounts[0].entity}`,
          balance: '-',
          lcybalance: '-',
          lcy: '-'
        },
        children: Object.entries(
          bankAccounts.reduce((acc, account) => {
            if (!acc[account.currency]) acc[account.currency] = [];
            acc[account.currency].push(account);
            return acc;
          }, {} as { [currency: string]: Account[] })
        ).map(([currency, currencyAccounts], currencyIdx) => ({
          key: `${bankIdx}-0-${currencyIdx}`,
          data: {
            name: currency,
            balance: currencyAccounts
              .map(acc => {
                const snap = balanceSnapshots.find(s => s.account_id === acc.id);

                const fxrates = getFxRateForCurrency(acc.currency, dashboardData.fxRates);
                return snap ? (snap.book * fxrates) : 0;
              })
              .reduce((a, b) => Math.round((a + b) / 1000) * 1000 , 0)
              .toLocaleString(),
            lcybalance: '-',
            lcy: currency
          },
          children: currencyAccounts.map((acc) => {
            const snap = balanceSnapshots.find(s => s.account_id === acc.id);
            const fxrates = getFxRateForCurrency(acc.currency, dashboardData.fxRates);

            return {
              key: `${acc.id}`,
              data: {
                id: acc.id,
                name: `Account ${acc.account_ref} (${acc.active ? "Operating" : "Inactive"})`,
                balance: snap ? (snap.book * fxrates).toLocaleString() : '-',
                lcybalance: snap ? snap.available.toLocaleString() : '-',
                lcy: acc.currency
              }
            };
          })
        }))
      }
    ]
  }));
}