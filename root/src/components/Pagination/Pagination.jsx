import backIcon from '../../assets/icons/icons8-back-90.png'
import forwardIcon from '../../assets/icons/icons8-forward-90.png'

export function Pagination({ currentPage, totalPages, onPageChange }) {


  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap w-fit self-center items-center justify-center gap-2 lg:border border-border-gray py-2 px-4 rounded-full">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center rounded-full border border-border-gray h-8 w-8 mr-4 cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <img src={backIcon} alt='forward' className='h-6 w-6' />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-full w-8 h-8 cursor-pointer  ${currentPage === page ? "bg-dark-red text-white" : "bg-light-red border border-border-gray hover:bg-main-red hover:text-text-white hover:border-none"}`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center rounded-full border border-border-gray h-8 w-8 ml-4 cursor-pointer hover:bg-light-red disabled:cursor-not-allowed disabled:opacity-70">
        <img src={forwardIcon} alt='forward' className='h-6 w-6' />
      </button>
    </div>
  );
}
