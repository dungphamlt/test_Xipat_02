import { useRouter } from "next/router";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || isLoading)
      return;
    // Chỉ thêm query parameter từ trang 2 trở đi
    if (page === 1) {
      router.push("/", undefined, { shallow: true });
    } else {
      router.push(`/?page=${page}`, undefined, { shallow: true });
    }
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1 || isLoading
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages || isLoading
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
}
