export type FinancialFlowFileAudit = {
  id: number;
  creationDate: string;
  userId: string;
  filename: string;
  storageFileId: string;
  financialFlowFileAudits: number[];
};

const statusLabels: Record<number, string> = {
  0: "Start",
  1: "Processed",
  2: "Completed",
  3: "Failed",
};

type Props = {
  transactions: FinancialFlowFileAudit[];
};

export default function FileTable({ transactions }: Props) {
  return (
    <div>
      <table className="file-transaction-table">
        <thead>
          <tr>
            <th>Creation Date</th>
            <th>File Name</th>
            <th>Storage File ID</th>
            <th>Last status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.creationDate}</td>
              <td>{t.filename}</td>
              <td>{t.storageFileId}</td>
              <td>  {t.financialFlowFileAudits.length > 0
                ? statusLabels[t.financialFlowFileAudits[t.financialFlowFileAudits.length - 1]]
                  : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
