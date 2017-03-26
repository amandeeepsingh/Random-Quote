// Libs
import React from 'react';
import { render } from 'react-dom';

// React Touch Plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Styles
import './sass/style.scss';

// App
import RandomQuote from './components/app';

// Render
render(
  <RandomQuote />,
  document.getElementById('app')
);
