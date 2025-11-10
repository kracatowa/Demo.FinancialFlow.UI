import type { Account, BalanceSnapshot } from "../pages/dashboardService";
import "./AccountSidePanel.css";

export default function AccountSidePanel({
  visible,
  setVisible,
  accountData,
  balanceSnapshot
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  accountData: Account | null;
  balanceSnapshot: BalanceSnapshot | null;
}) {
  return (
    <>
      {visible && <div className="side-panel-overlay" onClick={() => setVisible(false)} />}
      <div className={`side-panel${visible ? " open" : ""}`}>
        <button className="close-button" onClick={() => setVisible(false)} aria-label="Close panel">×</button>
        <div className="side-panel-header">
          <div className="side-panel-icon">
            <span role="img" aria-label="Bank">🏦</span>
          </div>
          <div>
            <h2>Account {accountData?.account_ref}</h2>
            <span className={`account-status ${accountData?.active ? "active" : "inactive"}`}>
              {accountData?.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className="side-panel-details">
          <div className="side-panel-detail">
            <label>Bank</label>
            <span>{accountData?.bank}</span>
          </div>
          <div className="side-panel-detail">
            <label>Entity</label>
            <span>{accountData?.entity}</span>
          </div>
          <div className="side-panel-detail">
            <label>Currency</label>
            <span>{accountData?.currency}</span>
          </div>
          <div className="side-panel-detail">
            <label>Balance</label>
            <span>
              {balanceSnapshot ? balanceSnapshot.book.toLocaleString() : "-"}
              {accountData?.currency ? ` ${accountData.currency}` : ""}
            </span>
          </div>
          <div className="side-panel-detail-item-full side-">
            <label>Last update</label>
            <span>{balanceSnapshot?.as_of_utc}</span>
          </div>
        </div>
        <div className="side-panel-actions">
          <button>View Transactions</button>
          <button>Export CSV</button>
        </div>
      </div>
    </>
  );
}