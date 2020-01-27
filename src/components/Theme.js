import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    powderWhite: '#fffdf9',
    persianGreen: '#06b49a',
    lightBlue: '#afdbd2',
    onyx: '#36313d'
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em'
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;

