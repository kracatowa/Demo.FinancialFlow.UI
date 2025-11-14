import type { TreeNode } from "primereact/treenode";
import type { DashboardData, Account, BalanceSnapshot, FxRate } from "./dashboardService";

// Local interfaces for better type safety and readability
interface GroupedAccounts {
  [key: string]: Account[];
}

interface CalculatedBalance {
  usdAmount: number;
  localAmount: number;
}

// Generic grouping function to reduce code duplication
function groupAccountsBy<T extends Account>(
  accounts: T[], 
  keySelector: (account: T) => string
): GroupedAccounts {
  const groups: GroupedAccounts = {};
  accounts.forEach(acc => {
    const key = keySelector(acc);
    if (!groups[key]) groups[key] = [];
    groups[key].push(acc);
  });
  return groups;
}

function groupAccountsByBank(accounts: Account[]): GroupedAccounts {
  return groupAccountsBy(accounts, acc => acc.bank);
}

function groupAccountsByEntity(accounts: Account[]): GroupedAccounts {
  return groupAccountsBy(accounts, acc => acc.entity);
}

function groupByCurrency(accounts: Account[]): GroupedAccounts {
  return groupAccountsBy(accounts, acc => acc.currency);
}

function getFxRateForCurrency(currency: string, fxRates: FxRate[]): number {
  if (currency === 'USD') return 1;
  
  const fxRate = fxRates.find(fx => fx.from_ccy === currency);
  return fxRate ? fxRate.rate : 1;
}

function roundToNearestThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

function calculateAccountBalance(
  account: Account, 
  balanceSnapshots: BalanceSnapshot[], 
  fxRates: FxRate[]
): CalculatedBalance {
  const snapshot = balanceSnapshots.find(s => s.account_id === account.id);
  if (!snapshot) {
    return { usdAmount: 0, localAmount: 0 };
  }

  const fxRate = getFxRateForCurrency(account.currency, fxRates);
  return {
    usdAmount: snapshot.book * fxRate,
    localAmount: snapshot.available
  };
}

function calculateTotalBalance(
  accounts: Account[], 
  balanceSnapshots: BalanceSnapshot[], 
  fxRates: FxRate[]
): CalculatedBalance {
  return accounts.reduce(
    (total, account) => {
      const balance = calculateAccountBalance(account, balanceSnapshots, fxRates);
      return {
        usdAmount: total.usdAmount + balance.usdAmount,
        localAmount: total.localAmount + balance.localAmount
      };
    },
    { usdAmount: 0, localAmount: 0 }
  );
}

function formatBalance(amount: number): string {
  return roundToNearestThousand(amount).toLocaleString();
}

function createAccountNode(
  account: Account, 
  balanceSnapshots: BalanceSnapshot[], 
  fxRates: FxRate[]
): TreeNode {
  const balance = calculateAccountBalance(account, balanceSnapshots, fxRates);
  
  return {
    key: account.id,
    data: {
      id: account.id,
      name: `Account ${account.account_ref} (${account.active ? "Operating" : "Inactive"})`,
      balance: balance.usdAmount > 0 ? formatBalance(balance.usdAmount) : '-',
      lcybalance: balance.localAmount > 0 ? balance.localAmount.toLocaleString() : '-',
      lcy: account.currency
    }
  };
}

function createCurrencyNode(
  currency: string,
  currencyAccounts: Account[],
  balanceSnapshots: BalanceSnapshot[],
  fxRates: FxRate[],
  bankIdx: number,
  entityIdx: number,
  currencyIdx: number
): TreeNode {
  const totalBalance = calculateTotalBalance(currencyAccounts, balanceSnapshots, fxRates);
  
  return {
    key: `${bankIdx}-${entityIdx}-0-${currencyIdx}`,
    data: {
      name: currency,
      balance: formatBalance(totalBalance.usdAmount),
      lcybalance: totalBalance.localAmount.toLocaleString(),
      lcy: currency
    },
    children: currencyAccounts.map(account => 
      createAccountNode(account, balanceSnapshots, fxRates)
    )
  };
}

function createEntityNode(
  entity: string,
  entityAccounts: Account[],
  balanceSnapshots: BalanceSnapshot[],
  fxRates: FxRate[],
  bankIdx: number,
  entityIdx: number
): TreeNode {
  const currencyGroups = groupByCurrency(entityAccounts);
  
  return {
    key: `${bankIdx}-${entityIdx}-0`,
    data: {
      name: entity,
      balance: '-',
      lcybalance: '-',
      lcy: '-'
    },
    children: Object.entries(currencyGroups).map(([currency, currencyAccounts], currencyIdx) =>
      createCurrencyNode(currency, currencyAccounts, balanceSnapshots, fxRates, bankIdx, entityIdx, currencyIdx)
    )
  };
}

function createBankNode(
  bankName: string,
  bankAccounts: Account[],
  balanceSnapshots: BalanceSnapshot[],
  fxRates: FxRate[],
  bankIdx: number
): TreeNode {
  const totalBankBalance = calculateTotalBalance(bankAccounts, balanceSnapshots, fxRates);
  const entityGroups = groupAccountsByEntity(bankAccounts);
  
  let children: TreeNode[] = [];
  let key = `${bankIdx}`
  let bankNam = bankName;

  if(Object.keys(entityGroups).length === 1) 
  {
    bankNam = `${bankName} - ${entityGroups[Object.keys(entityGroups)[0]][0].entity}`;
    key = `${bankNam}`;
    const currencyGroups = groupByCurrency(entityGroups[Object.keys(entityGroups)[0]]);

    children = Object.entries(currencyGroups).map(([currency, currencyAccounts], currencyIdx) =>
      createCurrencyNode(currency, currencyAccounts, balanceSnapshots, fxRates, bankIdx, 10, currencyIdx)
    )
  }
  else
  {
    children = Object.entries(entityGroups).map(([entity, entityAccounts], entityIdx) =>
      createEntityNode(entity, entityAccounts, balanceSnapshots, fxRates, bankIdx, entityIdx));
  }

  return {
    key: key,
    data: {
      name: bankNam,
      balance: formatBalance(totalBankBalance.usdAmount),
      lcybalance: '-',
      lcy: '-'
    },
    children: children
  };
}

export async function buildTreeNode(dashboardData: DashboardData): Promise<TreeNode[]> {
  const { accounts, balanceSnapshots, fxRates } = dashboardData;
  const bankGroups = groupAccountsByBank(accounts);

  return Object.entries(bankGroups).map(([bankName, bankAccounts], bankIdx) =>
    createBankNode(bankName, bankAccounts, balanceSnapshots, fxRates, bankIdx)
  );
}