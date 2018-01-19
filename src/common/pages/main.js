'use babel';

import React from 'react';
import ConnectionBar from '../components/ConnectionBar';
import DockerImageTable from '../components/DockerImageTable';

const Main = () => (
  <div>
    <ConnectionBar />
    <DockerImageTable />
  </div>
);

export default Main;
