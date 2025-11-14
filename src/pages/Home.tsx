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
  const [currencyDistribution, setCurrencyDistribution] = useState({
    USD: 62,
    EUR: 23,
    CAD: 15
  });
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
  
  useEffect(() => {
    let totalBalance = 0;

    

    treeTableNodes.forEach(node => {
      totalBalance += parseFloat(node.data.balance.replace(/,/g, '') || '0');
    });
    setTotalCash(totalBalance);

    setCurrencyDistribution({
      USD: 62,
      EUR: 23,
      CAD: 15
    });
  }, [treeTableNodes]);

  const handleAccountClick = (accountId: string | null) => {
    if (!accounts || !balanceSnapshots) return;
    const acc = accounts.find(a => a.id === accountId) || null;
    const snap = balanceSnapshots.find(s => s.account_id === accountId) || null;
    setAccount(acc);
    setBalanceSnapshot(snap);
    setVisible(true);
  }

  const actionTemplate = (node : TreeNode) => {
        let dataname = node.data.name

        return  dataname.startsWith("Account") ? (
        <button id={node.key ? `${node.key}` : ''} type="button" aria-label="Search" className="icon-button" onClick={()=>{ handleAccountClick(node.key?.toLocaleString() || ''); }}>
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
              <span key={currency}>{currency} {percentage}% </span>
            ))}
          </p>
        </div>
      </div>
      <div className="card">
        <TreeTable value={treeTableNodes}>
          <Column field="name" header="Bank / Entity / Currency / Account" style={{width: '24rem'}} expander sortable></Column>
          <Column field="lcybalance" header="Balance (LCY)" style={{width: '6rem', textAlign: 'center' }} sortable></Column>
          <Column field="lcy" header="LCY" style={{width: '4rem', textAlign: 'center' }} sortable></Column>
          <Column field="balance" header={`Base (${baseCurrency})`} style={{width: '6rem', textAlign: 'center' }} body={totalBalance} sortable></Column>
          <Column body={actionTemplate} style={{width: '1rem'}} />
        </TreeTable>
      </div>

      {visible && <AccountSidePanel visible={visible} setVisible={setVisible} accountData={account} balanceSnapshot={balanceSnapshot} />}
    </div>
  )
}