/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  GET_TRANSACTIONS_HIST, updateTransactionsHist, CREATE_NEW_PORTFOLIO, toggleCreatePortfolioModal,
} from 'src/actions/portfolio';

import transactionList from 'src/components/Dashboard/TransactionsHistory/data.json';

const portfolio = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_HIST:
      store.dispatch(updateTransactionsHist(transactionList));

      // axios({
      //   method: 'get',
      //   url: `https://dev.mycryptofolio.fr/v1/portfolio/${portfolioId}`,
      // })
      //   .then((res) => {
      //     store.dispatch(updateTransactionsHist(res.data));
      //   })
      //   .catch((err) => console.log(err));

      next(action);
      break;
    case CREATE_NEW_PORTFOLIO:
      const { inputText } = store.getState().portfolio.createPortfolio;

      store.dispatch(toggleCreatePortfolioModal());
      alert(`Le portefeuille ${inputText} a bien été créé.`);

      // axios({
      //   method: 'post',
      //   url: 'https://dev.mycryptofolio.fr/v1/portfolio',
      //   data: {
      //     name: inputText,
      //   },
      // })
      //   .then((res) => {
      //     /*
      //       Créer une nouvelle action pour mettre à jour la liste des portfolio du client
      //       store.dispatch(nouvelleAction(res.data))
      //       store.dispatch(toggleCreatePortfolioModal())
      //     */
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default portfolio;
