import './App.css';
import {ApolloProvider,ApolloClient,InMemoryCache} from '@apollo/client'
import Router from './Router';


function App() {
  const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })
  return (
    <ApolloProvider client={client}>
      <Router/>
    </ApolloProvider>
  );
}

export default App;
