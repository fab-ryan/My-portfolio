

import {
  createGlobalStyle,
} from 'styled-components';
import { DefaultTheme } from 'styled-components';

export interface Color {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  text: string;
}

export const themes: Color = {
  primary: '#10131a',
  secondary: '#2eb2D3',
  tertiary: '#585F69',
  background: '#10131a',
  text: '#EFF0F2',
};

export const GlobalStyle = createGlobalStyle`
    body {
        background-color:${(props) => props.theme.background}
        color: ${(props) => props.theme.text}
    }
`;
