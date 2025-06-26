import Header from './../widgets/components/Header'

export default function GlobalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}