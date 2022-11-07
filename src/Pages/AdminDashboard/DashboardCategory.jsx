import KpiCard from "./KpiCard";
import TableView from "./TableView";

function DashboardCategory({tableData, kpiData, userTypeName}) {
  return (
      <>
          <h1>{ userTypeName}</h1>
      <KpiCard data={kpiData} />
      <TableView data={tableData} />
    </>
  );
}

export default DashboardCategory;
