import { useEffect, useState } from "react";
import "./Home.css";
import { fetchDashboardData, type Account, type BalanceSnapshot, type DashboardData } from "./services/dashboardService";
import type { TreeNode } from "primereact/treenode";
import { buildTreeNode } from "./services/treeNodeService";
import AccountSidePanel from "../components/AccountSidePanel";
import { calculateCurrencyDistribution } from "./services/currencyDistributionService";
import DashboardTreeTable from "../components/DashboardTreeTable";
import DashboardSummaryCards from "../components/DashboardSummaryCards";

export default function Home() {
  const [date, setDate] = useState("2025-11-04 14:20 (UTC)");
  const [baseCurrency] = useState("USD");
  const [treeTableNodes, setTreeTableNodes] = useState<TreeNode[]>([]);
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [balanceSnapshot, setBalanceSnapshot] = useState<BalanceSnapshot | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [totalCash, setTotalCash] = useState(0);
  const [currencyDistribution, setCurrencyDistribution] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
      setTreeTableNodes(await buildTreeNode(dashboardData));
    };
    fetchData();
  }, []);

  const accounts = data?.accounts ?? [];
  const balanceSnapshots = data?.balanceSnapshots ?? [];

  useEffect(() => {
    let totalBalance = 0;
    treeTableNodes.forEach(node => {
      totalBalance += parseFloat(node.data.balance.replace(/,/g, '') || '0');
    });
    setTotalCash(totalBalance);

    setDate(
      new Date()
        .toLocaleString('en-US', {
          timeZone: 'America/New_York',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(',', '') + ' (NY)'
    );

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
  }, [treeTableNodes, data, baseCurrency]);

  const handleAccountClick = (accountId: string | null) => {
    if (!accounts || !balanceSnapshots) return;
    const acc = accounts.find(a => a.id === accountId) || null;
    const snap = balanceSnapshots.find(s => s.account_id === accountId) || null;
    setAccount(acc);
    setBalanceSnapshot(snap);
    setVisible(true);
  };

  return (
    <div className="app-container home-container">
      <h2 className="home-container-title">Global Cash Dashboard</h2>
        <DashboardSummaryCards
          date={date}
          totalCash={totalCash}
          baseCurrency={baseCurrency}
          currencyDistribution={currencyDistribution}
        />
        <DashboardTreeTable
          treeTableNodes={treeTableNodes}
          baseCurrency={baseCurrency}
          onAccountClick={handleAccountClick}
          totalBalance={totalCash}
        />

      {visible && <AccountSidePanel visible={visible} setVisible={setVisible} accountData={account} balanceSnapshot={balanceSnapshot} />}
    </div>
  );
}