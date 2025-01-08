export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
       <main className="h-full bg-[#1e113b] overflow-auto">
          <div className="mx-auto max-w-screen-xl h-full w-full">
             {children}
          </div>
       </main>
    );
 }
 