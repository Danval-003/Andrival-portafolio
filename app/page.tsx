import ProjectsSection from "./Sections/ProjectSection";

export default function Home() {
  return (
    <div className="font-sans  items-center justify-items-center min-h-screen bg-amber-50">
      <main className={"flex flex-col w-screen"}>
        <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-[#02082e]">
          Portafolio
        </h1>
        <ProjectsSection />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Footer content with social links, to contact, etc. */}
        <p className="text-sm text-gray-600">
          © 2023 Your Name. All rights reserved.
        </p>
        <p className="text-sm text-gray-600">
          Contact:{" "}
          <a href="mailto:yourname@example.com">yourname@example.com</a>
        </p>
        <p className="text-sm text-gray-600">
          Follow me on{" "}
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </p>
      </footer>
    </div>
  );
}
