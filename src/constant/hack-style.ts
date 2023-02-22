export const DEFAULT_HACK_STYLE = `
table {
  width: 100%!important;
}
table td{
  padding: 4px 0 !important;
  line-height: 16px !important;
  min-height: 16px !important;
  height: auto !important;
}
table th {
  line-height: 24px !important;
  height: 24px !important;
}
.cell {
    white-space: normal!important;
    line-height: 16px !important;
    min-height: 16px !important;
    font-size: 12px !important;
    padding: 0 4px !important;
}
.narrow-table .el-table td.el-table__cell {
  line-height: 16px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}
.cell div {
    white-space: normal!important;
}
.text-overflow {
    text-overflow: inherit!important;
}
@media print {
    * {
        -webkit-print-color-adjust: exact !important;
        -moz-print-color-adjust: exact !important;
        -ms-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }
}
#pdfDom {
    zoom: 0.8!important;
}
`;
