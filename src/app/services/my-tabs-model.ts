const data = {
  currentPage: 'worlds',
};

export default {
  data,
  setPage,
};

function setPage(page: string) {
  data.currentPage = page;
}
