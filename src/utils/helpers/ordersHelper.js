/* eslint-disable sonarjs/no-duplicated-branches */
export const getStripePriceId = (n) => {
  switch (n) {
    case 1:
      return process.env.NODE_ENV === "development"
        ? "price_1LuqESAvLPvC9h7xbA3kQhgH"
        : "price_1M7v52AvLPvC9h7xKhGRAJss";
    case 2:
      return process.env.NODE_ENV === "development"
        ? "price_1M659GAvLPvC9h7xSxCVcVPv"
        : "price_1M7v5AAvLPvC9h7xXq1s7Lsg";
    case 3:
      return process.env.NODE_ENV === "development"
        ? "price_1LuqGLAvLPvC9h7xTYNbk7hI"
        : "price_1M7v5IAvLPvC9h7xF54jEsGG";
    default:
      return process.env.NODE_ENV === "development"
        ? "price_1M659GAvLPvC9h7xSxCVcVPv"
        : "price_1M7v5AAvLPvC9h7xXq1s7Lsg";
  }
};

export const getDeposit = (n) => {
  switch (n) {
    case 1:
      return 500;
    case 2:
      return 1000;
    case 3:
      return 1500;
    default:
      return 1500;
  }
};
