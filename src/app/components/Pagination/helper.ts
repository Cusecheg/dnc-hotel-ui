
const MAX_PAGES = 5;

export const getPaginationRange = (currentPage: number, totalPages: number): number[] => {

    const halfMaxPages = Math.floor(MAX_PAGES / 2);

    const startPageOffset = currentPage - halfMaxPages;

    let startPage = Math.max(1, startPageOffset);

    let endPage = startPage + (MAX_PAGES - 1);

    if (endPage > totalPages) {
        startPage = Math.max(1, totalPages - MAX_PAGES + 1);
    }


    const getPaginationLength = totalPages < MAX_PAGES ? totalPages : MAX_PAGES;

    const result =  Array.from({ length: getPaginationLength }, (_, value) => startPage + value);
    return result;
    
}