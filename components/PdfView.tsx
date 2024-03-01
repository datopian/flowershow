import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfView({
  filePath,
  width,
  height,
}: {
  filePath: string;
  width: number;
  height: number;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={width} height={height} />
      </Document>
      <div className="flex items-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2 transition duration-300 ease-in-out hover:bg-blue-600 cursor-pointer"
          onClick={handlePrevPage}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className="text-lg">
          Page {pageNumber} of {numPages}
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2 transition duration-300 ease-in-out hover:bg-blue-600 cursor-pointer"
          onClick={handleNextPage}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
