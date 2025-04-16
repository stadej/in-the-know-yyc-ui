import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import localFont from "next/font/local";
import "../app/styles/globals.css";
import CmsLayout from '../layouts/cmsLayout'
import PublicLayout from '../layouts/publicLayout'

// GOOGLE ANALITYCS
import { GoogleAnalytics } from '@next/third-parties/google'


const montserrat = localFont({
  src: "../app/fonts/montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 200 300 400 500 600 700 800 900",
});
const sarabun = localFont({
  src: "../app/fonts/sarabun/Sarabun-Regular.ttf",
  variable: "--font-sarabun",
  weight: "100 200 300 400 500 600 700 800 900",
});

export default function MyApp({Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <div className={`${montserrat.variable} ${sarabun.variable} antialiased`}>

      {currentPage.startsWith('/cms') ? (
        // ONLY FOR CMS
            <CmsLayout>
              <Component {...pageProps} />
            </CmsLayout>
      ) : (
        // PUBLIC WEBSITE
        <PublicLayout>
          <Component {...pageProps} />
          <GoogleAnalytics gaId="G-HXHLMMJC5E" />
        </PublicLayout>
      )}




    </div>
  );
}