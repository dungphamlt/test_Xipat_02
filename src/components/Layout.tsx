import Head from "next/head";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Awesome blog with Next.js" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <main className="font-inter">{children}</main>
      </div>
    </>
  );
}
