export function applyPagination(
  documents: any,
  page: number,
  rowsPerPage: any
) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
