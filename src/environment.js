import { Environment, RecordSource, Store } from 'relay-runtime';
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
} from 'react-relay-network-modern';

const REACT_APP_GITHUB_AUTH_TOKEN = "WRITE-YOUR-GITHUB-TOKEN-HERE";


const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: (req) => Promise.resolve('https://api.github.com/graphql'),
    }),
    authMiddleware({
      token: REACT_APP_GITHUB_AUTH_TOKEN,
    }),
  ],
);

const source = new RecordSource();
const store = new Store(source);
const environment = new Environment({ network, store });

export default environment;




