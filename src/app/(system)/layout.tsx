import Navbar from "./components/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Navbar>{children}</Navbar>;
}
