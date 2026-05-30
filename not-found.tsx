import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A] px-6 pt-32 pb-20">

      <section className="max-w-3xl mx-auto text-center">

        <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
          404 Error
        </p>

        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-5">
          This page doesn’t exist.
        </h1>

        <p className="text-[#6f6259] text-lg leading-relaxed max-w-xl mx-auto mb-10">
          The page you’re looking for may have been moved or no longer exists.
          You can return home or continue your skin analysis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="
              rounded-full 
              border border-[#e5ddd4] 
              px-6 py-3 
              text-sm 
              hover:bg-[#f9f4f2] 
              transition
            "
          >
            Go home
          </Link>

          <Link
            href="/analyse/upload"
            className="
              rounded-full 
              bg-[#bf908a] 
              text-white 
              px-6 py-3 
              text-sm 
              hover:opacity-90 
              transition
            "
          >
            Start skin analysis
          </Link>

        </div>

      </section>

    </main>
  );
}