export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-lime-400">
          Blockchain Berlin
        </h1>
        <p className="text-xl text-zinc-300 mb-8">
          Welcome to my personal website
        </p>
        <div className="space-y-4 text-zinc-400">
          <p>This is a static website built with Next.js.</p>
          <p>You can customize this page to add your content.</p>
        </div>
      </div>
    </main>
  );
}

