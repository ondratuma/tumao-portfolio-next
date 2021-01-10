import '../styles/globals.css'
import '../styles/Page.animations.css';
import '../styles/roboto.scss';
import '../styles/general.scss';
import type { AppProps /*, AppContext */ } from 'next/app'
import {useRouter} from "next/router";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return <Component {...pageProps} key={router.route} />

}
export default MyApp