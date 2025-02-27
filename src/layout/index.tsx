import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
};
export default function PublicLayout({
  children = <></>,
  title = "Global Media",
  description,
  ogImage,
}: Props) {
  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta
          name="description"
          content="Support our cause to build a sacred temple through our charitable trust. Join us in creating a place of worship and community for generations to come. Donate now and be a part of this noble endeavor."
        />
        <meta
          property="og:image"
          content="https://www.maasiddheshwari.org/og_image.png"
        />
      </Head>
      <main className="w-full relative ">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
