import React from 'react';
import { Header, Intro, Registration, Users } from './components';
import './App.scss';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <main className="App__content">
      <Intro />
      <Users />
      <Registration />
    </main>
  </div>
);
