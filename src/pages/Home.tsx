import React, { useEffect, useState } from "react";
import "./Home.css";
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { fetchDashboardData, type Account, type BalanceSnapshot, type DashboardData } from "./dashboardService";
import type { TreeNode } from "primereact/treenode";
import { buildTreeNode } from "./treeNodeService";
import { FaSearch } from "react-icons/fa";
import AccountSidePanel from "../components/AccountSidePanel";

export default function Home() {
  const [date, setDate] = useState("2025-11-04 14:20 (UTC)");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [totalCash, setTotalCash] = useState(0);
  const [currencyDistribution, setCurrencyDistribution] = useState<{ [key: string]: number }>({});
  const [treeTableNodes, setTreeTableNodes] = useState<TreeNode[]>([]);
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [balanceSnapshot, setBalanceSnapshot] = useState<BalanceSnapshot | null>(null);
  const [balanceSnapshots, setBalanceSnapshots] = useState<BalanceSnapshot[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboardData();
      
      setData(data);
      setAccounts(data.accounts);
      setBalanceSnapshots(data.balanceSnapshots);
      setTreeTableNodes(await buildTreeNode(data))
    };
    fetchData();
  }, []);

  function calculateCurrencyDistribution(
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
  
  useEffect(() => {
    let totalBalance = 0;

    treeTableNodes.forEach(node => {
      totalBalance += parseFloat(node.data.balance.replace(/,/g, '') || '0');
    });
    setTotalCash(totalBalance);

    if (data) {
        setCurrencyDistribution(
          calculateCurrencyDistribution(
            accounts,
            balanceSnapshots,
            data.fxRates,
            baseCurrency,
            totalBalance
          )
        );
      }
  }, [treeTableNodes]);

  const actionTemplate = (node : TreeNode) => {
        let dataname = node.data.name

        return  dataname.startsWith("Account") ? (
        <button id={node.key ? `${node.key}` : ''} type="button" aria-label="Search" className="icon-button" onClick={()=>{ setVisible(true); setAccount(accounts.find(acc => acc.id === node.key) || null); setBalanceSnapshot(balanceSnapshots.find(snap => snap.account_id === node.key) || null); }}>
            <FaSearch />
        </button>
        ) : null;
  };

  const totalBalance = (node : TreeNode) : React.ReactNode => {
    let lcybalance = node.data.lcybalance;
    let fontWeight = lcybalance === '-' ? 'bold' : 'normal';

    return <span style={{ fontWeight: fontWeight }}>{ node.data.balance}</span>;
  }

  return (
    <div className="app-container home-container">
      <h2 className="home-container-title">Global cash dashboard</h2>
      <div className="home-container-info">
        <div className="home-card">
          <p className="home-card-title">As of</p>
          <p className="home-card-content">{date}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">Total cash</p>
          <p className="home-card-content">{totalCash.toLocaleString()} {baseCurrency}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">Base currency</p>
          <p className="home-card-content">{baseCurrency}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">By Currency</p>
          <p className="home-card-content">
            {Object.entries(currencyDistribution).map(([currency, percentage]) => (
              <div><span key={currency}>{currency} {percentage}%</span><span>&nbsp;</span></div>
            ))}
          </p>
        </div>
      </div>
      <div className="card">
        <TreeTable value={treeTableNodes}>
          <Column field="name" header="Bank / Entity / Currency / Account" style={{width: '24rem'}} expander sortable></Column>
          <Column field="lcybalance" header="Balance (LCY)" style={{width: '6rem'}} sortable></Column>
          <Column field="lcy" header="LCY" style={{width: '4rem'}} sortable></Column>
          <Column field="balance" header={`Base (${baseCurrency})`} style={{width: '6rem'}} body={totalBalance} sortable></Column>
          <Column body={actionTemplate} style={{width: '1rem'}} />
        </TreeTable>
      </div>

      {visible && <AccountSidePanel visible={visible} setVisible={setVisible} accountData={account} balanceSnapshot={balanceSnapshot} />}
    </div>
  )
}