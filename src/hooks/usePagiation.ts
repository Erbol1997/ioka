import {useState} from "react";

interface usePaginationProps {
    totalPages: number
    step?: number
    isLooped?: boolean
}

export const usePagination = ({totalPages, step = 5, isLooped = false}: usePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1)

    const nextPage = () => {
        setCurrentPage(prev => {
            if (prev >= totalPages) return isLooped ? 1 : prev
            return prev + 1
        })
    }

    const prevPage = () => {
        setCurrentPage(prev => {
            if (prev <= 1) return isLooped ? totalPages : prev
            return prev - 1
        })
    }

    const nextStep = () => {
        setCurrentPage(prev => {
            if (prev + step > totalPages) return isLooped ? (prev + step) % totalPages || 1 : totalPages
            return prev + step
        })
    }

    const prevStep = () => {
        setCurrentPage(prev => {
            if (prev - step < 1) return isLooped ? totalPages - (step - prev) + 1 : 1
            return prev - step
        })
    }

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    const pages = generatePages(currentPage, totalPages)

    return {currentPage ,nextPage, prevPage, nextStep, prevStep, goToPage, pages}
}

function generatePages(currentPage: number, totalPages: number): (number | string)[] {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else {
        const startPages = [1, 2, 3, 4, 5]
        const endPages = [totalPages]

        if (currentPage <= 4) {
            pages.push(...startPages, "...", ...endPages)
        } else if (currentPage >= totalPages - 3) {
            pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
        }
    }

    return pages
}