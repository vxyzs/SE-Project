"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ScrollToTop from "@/components/ScrollToTop"
import { Inter } from "next/font/google"
import "node_modules/react-modal-video/css/modal-video.css"
import "../styles/index.css"
import { AuthProvider } from "@/context/AuthContext"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NextUIProvider} from "@nextui-org/react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <AuthProvider>
          <NextUIProvider>
          <ProgressBar
              height="3px"
              color="#30B8E2"
              options={{ showSpinner: true }}
              shallowRouting
            />
          <Header />
          <Toaster 
            position="top-center"
            reverseOrder={false}
          />
          {children}
          <Footer />
          <ScrollToTop />
          </NextUIProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

import { Providers } from "./providers"
