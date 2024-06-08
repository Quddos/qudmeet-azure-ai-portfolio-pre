import Head from "next/head";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;



export const metadata = {
  title: "Quddus AI portfolio",
  description: "QudMeet Azure AI Porfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"/>

	<link rel="icon" type="image/jpg" href="./imgs/favicon.png"/>
      </Head>
      <body >{children}</body>
    </html>
  );
}
