import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const downloadExcel = (fileName) => {
  const ws = XLSX.utils.json_to_sheet(fileName);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `${fileName}.xlsx`);
};

export default downloadExcel;