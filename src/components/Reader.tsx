import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Settings,
  BookOpen,
  Type,
  Moon,
  Sun,
  X,
  Loader2
} from 'lucide-react';
import { BookFlip } from './BookFlip';
import * as pdfjs from 'pdfjs-dist';
import localforage from 'localforage';

// Initialize localforage
localforage.config({
  name: 'flipverse',
  storeName: 'books'
});

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
console.log('PDF.js worker configured:', pdfjs.GlobalWorkerOptions.workerSrc);

interface ReaderProps {
  bookId?: string;
  material?: {
    id: string;
    title: string;
    filename: string;
    subject: string;
    semester: string;
  };
  onBack: () => void;
}

interface Book {
  id: string;
  title: string;
  currentPage: number;
  totalPages: number;
  lastOpened: number;
  type: string;
  coverUrl?: string;
}

const PDFPage = ({ pdf, pageNumber, theme }: { pdf: any, pageNumber: number, theme: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;
      
      try {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setLoading(false);
      } catch (error) {
        console.error('Error rendering PDF page:', error);
      }
    };

    renderPage();
  }, [pdf, pageNumber]);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
      theme === 'light' ? 'bg-bg' : 
      theme === 'dark' ? 'bg-dark' : 
      'bg-[#f4ecd8]'
    }`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      )}
      <canvas ref={canvasRef} className="max-w-full max-h-full shadow-lg" />
      <div className="mt-4 text-[10px] font-bold opacity-30 uppercase tracking-widest">
        PAGE {pageNumber}
      </div>
    </div>
  );
};

export const Reader = ({ bookId, material, onBack }: ReaderProps) => {
  const [book, setBook] = useState<any>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const loadResource = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        if (bookId) {
          console.log('Reader: loading bookId', bookId);
          const storedBooks = (await localforage.getItem<Book[]>('books')) || [];
          const found = storedBooks.find((b) => b.id === bookId);
          if (found) {
            setBook(found);
            setCurrentPage(found.currentPage || 0);

            let pdfData = await localforage.getItem<any>(`pdf-${bookId}`);
            console.log('Reader: loaded pdfData from storage', pdfData);

            if (!pdfData) {
              throw new Error('PDF data not found in local storage');
            }

            // Some storage drivers return Blob; convert to ArrayBuffer
            if (pdfData instanceof Blob) {
              pdfData = await pdfData.arrayBuffer();
            }
            // Convert typed arrays to ArrayBuffer
            if (ArrayBuffer.isView(pdfData)) {
              pdfData = pdfData.buffer;
            }

            const loadingTask = pdfjs.getDocument({ data: pdfData });
            const pdfDoc = await loadingTask.promise;
            setPdf(pdfDoc);
          } else {
            throw new Error('Book metadata not found');
          }
        } else if (material) {
          setBook({
            title: material.title,
            totalPages: 0,
          });

          const materialUrl = `/materials/${material.filename}`;
          try {
            const loadingTask = pdfjs.getDocument(materialUrl);
            const pdfDoc = await loadingTask.promise;
            setPdf(pdfDoc);
            setBook(prev => ({ ...prev, totalPages: pdfDoc.numPages }));
          } catch (e) {
            console.warn('Material PDF not found, using placeholder logic');
            setBook(prev => ({ ...prev, totalPages: 10 }));
          }
        }
      } catch (error: any) {
        console.error('Error loading resource:', error);
        setLoadError(error?.message || 'Unable to load PDF.');
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [bookId, material]);

  const handlePageChange = async (index: number) => {
    setCurrentPage(index);

    if (!bookId) return;

    const storedBooks = (await localforage.getItem<Book[]>('books')) || [];
    const updatedBooks = storedBooks.map((b) =>
      b.id === bookId ? { ...b, currentPage: index, lastOpened: Date.now() } : b
    );
    setBook((prev) => (prev ? { ...prev, currentPage: index } : prev));
    setTimeout(() => {
      localforage.setItem('books', updatedBooks);
    }, 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const renderPageContent = (index: number) => {
    if (!pdf) {
      return (
        <div className={`w-full h-full flex flex-col p-12 transition-colors duration-500 ${
          theme === 'light' ? 'bg-bg text-dark' : 
          theme === 'dark' ? 'bg-dark text-bg' : 
          'bg-[#f4ecd8] text-[#5b4636]'
        }`}>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-12 h-12 text-accent mb-4 opacity-50" />
            <p className="font-display text-xl mb-2">PAGE {index + 1}</p>
            <p className="text-sm opacity-50">Content not available</p>
          </div>
        </div>
      );
    }

    return <PDFPage pdf={pdf} pageNumber={index + 1} theme={theme} />;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark flex flex-col items-center justify-center text-bg">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <h2 className="text-2xl font-display uppercase tracking-widest">Opening Resource...</h2>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark text-bg p-6">
        <div className="max-w-md w-full rounded-2xl bg-black/40 border border-white/10 p-8 text-center">
          <h2 className="text-xl font-display mb-4">Unable to open document</h2>
          <p className="text-sm opacity-80 mb-6">{loadError}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setLoadError(null);
                setLoading(true);
                // Trigger reload by updating state slightly
                setTimeout(() => {
                  if (bookId || material) {
                    // Force a re-mount by resetting state
                    setPdf(null);
                    setBook(null);
                  }
                }, 10);
              }}
              className="px-5 py-2 bg-accent text-dark font-bold rounded-full hover:bg-accent/90 transition"
            >
              Retry
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2 bg-white/10 text-bg font-bold rounded-full hover:bg-white/20 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-700 ${
      theme === 'light' ? 'bg-bg' : 
      theme === 'dark' ? 'bg-[#0a0a0a]' : 
      'bg-[#e8dfc4]'
    }`}>
      {/* Top Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="h-20 px-6 flex items-center justify-between bg-black/5 backdrop-blur-md border-b border-black/5 z-10"
          >
            <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-black/5 rounded-full transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-display text-lg leading-none truncate max-w-[200px]">{book.title}</h2>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  {currentPage + 1} of {book.totalPages} pages
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-black/5 p-1 rounded-full mr-4">
                <button 
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-bg shadow-sm' : 'opacity-40'}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setTheme('sepia')}
                  className={`p-2 rounded-full transition-all ${theme === 'sepia' ? 'bg-[#f4ecd8] shadow-sm' : 'opacity-40'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#f4ecd8] border border-black/10" />
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-dark text-bg shadow-sm' : 'opacity-40'}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={toggleFullscreen}
                className="p-2 hover:bg-black/5 rounded-full transition-all"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Reader Area */}
      <div 
        className="flex-1 relative overflow-hidden flex items-center justify-center"
        onClick={() => setShowControls(!showControls)}
      >
        <BookFlip 
          ref={flipBookRef}
          totalPages={book.totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          renderPage={renderPageContent}
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); flipBookRef.current?.pageFlip().flipPrev(); }}
            className="p-4 bg-black/5 hover:bg-black/10 rounded-full text-current pointer-events-auto opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); flipBookRef.current?.pageFlip().flipNext(); }}
            className="p-4 bg-black/5 hover:bg-black/10 rounded-full text-current pointer-events-auto opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="h-16 px-10 bg-black/5 backdrop-blur-md border-t border-black/5 flex items-center gap-6 z-10"
          >
            <span className="text-[10px] font-bold opacity-40 w-12">{currentPage + 1}</span>
            <div className="flex-1 h-1 bg-black/10 rounded-full overflow-hidden relative cursor-pointer group">
              <div 
                className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percent = x / rect.width;
                  const page = Math.floor(percent * book.totalPages);
                  flipBookRef.current?.pageFlip().flip(page);
                }}
              />
              <motion.div 
                className="h-full bg-accent"
                animate={{ width: `${((currentPage + 1) / book.totalPages) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold opacity-40 w-12 text-right">{book.totalPages}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
