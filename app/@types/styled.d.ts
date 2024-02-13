import 'styled-components';
import { type theme } from '@/utils/theme';
declare module 'styled-components' {
  export interface DefaultTheme extends theme {}
}
