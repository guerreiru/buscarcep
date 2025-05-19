export default function PdfViewPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] md:h-screen px-4">
      <iframe
        src="/docs/ruas-limoeiro.pdf"
        width="100%"
        className="border rounded h-[calc(100vh-256px)] md:h-[calc(100vh-180px)]"
      />

      <a
        href="/docs/ruas-limoeiro.pdf"
        download
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Baixar PDF
      </a>
    </div>
  );
}
