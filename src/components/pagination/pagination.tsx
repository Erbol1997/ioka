import * as React from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
    currentPage: number
    totalPages: number
    pages: (number | string)[]
    isLooped?: boolean
    nextPage: () => void
    prevPage: () => void
    nextStep: () => void
    prevStep: () => void
    goToPage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    pages,
    isLooped = false,
    totalPages,
    nextPage,
    prevPage,
    nextStep,
    prevStep,
    goToPage,
}) => {
    return (
        <div className={styles.pagination}>
            <button onClick={prevStep} className={styles.pagination_buttons} disabled={!isLooped && currentPage === 1}>{`<<`}</button>
            <button onClick={prevPage} className={styles.pagination_buttons} disabled={!isLooped && currentPage === 1}>{`<`}</button>

            {
                pages.map((page,  i) => page === "..." ? (
                    <span key={i} className={styles.dots}>...</span>
                ) : (
                    <button key={i} className={`${styles.pagination_buttons} ${currentPage === page ? styles.active : ""}`}
                    onClick={() => goToPage(page as number)}
                    >
                        {page}
                    </button>
                ))
            }

            <button onClick={nextPage} className={styles.pagination_buttons} disabled={!isLooped && currentPage === totalPages}>{`>`}</button>
            <button onClick={nextStep} className={styles.pagination_buttons} disabled={!isLooped && currentPage === totalPages}>{`>>`}</button>

        </div>
    )
}