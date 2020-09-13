// App.js
import React, { useState, useRef } from 'react';
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from './environment';

function UserData(props) {
  const { login, user } = props;
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <p>User {login} has {user.repositories.totalCount} repos</p>
  );
}


export default function App(props) {
  const [login, setLogin] = useState('ynonp');
  const loginInput = useRef(null);

  function getRepoCount(e) {
    e.preventDefault();
    setLogin(loginInput.current.value);
  }

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
          query AppQuery($login: String!) {
            user(login: $login) { 
              repositories {
                  totalCount
              }
            }
          }
        `}
          variables={{login}}
          render={({error, props}) => {
            if (error) {
              return <div>Error!</div>;
            }
            return (
              <div>
                <form onSubmit={getRepoCount}>
                  <input type="text" defaultValue={login} ref={loginInput} />
                  <button>Get Repo Count</button>
                </form>
                <UserData {...props} login={login} />
              </div>
            );
          }}
    />
  );
}
