'use client';

import { Button } from '@/components/ui/button';
import { useCharacterFilters } from '@/hooks/useCharacterFilters';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const { filters, setPage } = useCharacterFilters({});
  const currentPage = filters.page;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - 2, 1);
      const rightSiblingIndex = Math.min(currentPage + 2, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('dots');
        pageNumbers.push(totalPages);
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pageNumbers.push(1);
        pageNumbers.push('dots');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pageNumbers.push(1);
        pageNumbers.push('dots');
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('dots');
        pageNumbers.push(totalPages);
      } else {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-12 flex flex-col items-center justify-center gap-4"
    >
      <div className="text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
          Toplam <span className="font-bold text-white">{totalPages}</span> sayfa
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Önceki sayfa"
          className="group h-9 w-9 rounded-full border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-400" />
        </Button>

        <div className="flex gap-1.5">
          {getPageNumbers().map((page, index) => {
            if (page === 'dots') {
              return (
                <Button
                  key={`dots-${index}`}
                  variant="ghost"
                  size="icon"
                  disabled
                  className="cursor-default bg-transparent hover:bg-transparent"
                >
                  <span className="text-white/50">•••</span>
                </Button>
              );
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="icon"
                onClick={() => handlePageClick(page as number)}
                aria-label={`Sayfa ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`h-9 w-9 rounded-full transition-all duration-300 ${
                  currentPage === page
                    ? 'border-purple-400/30 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-purple-500/30'
                    : 'border-white/10 bg-black/40 text-white backdrop-blur-sm hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={currentPage === page ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={currentPage === page ? 'font-bold' : ''}
                >
                  {page}
                </motion.span>
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Sonraki sayfa"
          className="group h-9 w-9 rounded-full border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-400" />
        </Button>
      </div>
    </motion.div>
  );
}
