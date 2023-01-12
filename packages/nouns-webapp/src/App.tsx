import { useEffect } from 'react';
import { ChainId, useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';
import { setActiveAccount } from './state/slices/account';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { setAlertModal } from './state/slices/application';
import classes from './App.module.css';
import '../src/css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/Modal';
import NavBar from './components/NavBar';
import NetworkAlert from './components/NetworkAlert';
import Footer from './components/Footer';
import AuctionPage from './pages/Auction';
import GovernancePage from './pages/Governance';
import CreateProposalPage from './pages/CreateProposal';
import VotePage from './pages/Vote';
import NoundersPage from './pages/Nounders';
import NotFoundPage from './pages/NotFound';
import Playground from './pages/Playground';
import Partners from './pages/Partners';
import Analytics from './pages/Analytics';
import AnalyticsDapp from './pages/AnalyticsDapp';
import { CHAIN_ID } from './config';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AvatarProvider } from '@davatar/react';
import dayjs from 'dayjs';

function App() {
  const { account, chainId, library } = useEthers();
  const dispatch = useAppDispatch();
  dayjs.extend(relativeTime);

  useEffect(() => {
    // Local account array updated
    dispatch(setActiveAccount(account));
  }, [account, dispatch]);

  const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <div className={`${classes.wrapper}`}>
      {Number(CHAIN_ID) !== chainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )}
      <BrowserRouter>
        <AvatarProvider
          provider={chainId === ChainId.Mainnet ? library : undefined}
          batchLookups={true}
        >
          <NavBar />
          <Switch>
            <Route exact path="/" component={AuctionPage} />
            <Redirect from="/auction/:id" to="/socialnoun/:id" />
            <Route
              exact
              path="/socialnoun/:id/"
              render={props => <AuctionPage initialAuctionId={Number(props.match.params.id)} />}
            />
            <Route exact path="/ref/:revcode" render={props => <AuctionPage revCode={props.match.params.revcode} />} />
            <Route
              exact
              path="/dapp/:name/:id"
              render={props => <AnalyticsDapp dappName={String(props.match.params.name)} id={String(props.match.params.id)}/>}
            />
            <Route exact path="/founders" component={NoundersPage} />
            <Route exact path="/create-proposal" component={CreateProposalPage} />
            <Route exact path="/vote" component={GovernancePage} />
            <Route exact path="/vote/:id" component={VotePage} />
            <Route exact path="/playground" component={Playground} />
            <Route exact path="/protocols" component={Partners} />
            <Route exact path="/analytics" component={Analytics} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </AvatarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
