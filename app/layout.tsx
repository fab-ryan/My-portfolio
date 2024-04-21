import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '@/lib/registry';
import ReduxProvider from '../redux/reduxProvider';
import { ToastContainer ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <body
        className={inter.className}
        suppressHydrationWarning={true}
        style={{
          ...inter.style,
        }}
      >
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            transition={Zoom}
          
          />
        <ReduxProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
