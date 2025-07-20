/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const PaginationContainer = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
`;

const PageButton = styled.button`
background: #3f51b5;
color: white;
border: none;
border-radius: 4px;
padding: 0.4rem 0.8rem;
cursor: pointer;
font-size;

&:disabled {
opacity: 0.5;
cursor: not-allowed;
}

&:hover:enabled {
background: #303f9f;
}
`;

const PageInfo = styled.span`
font-size: 0.875rem;
`;

function Pagination({ currentPage, totalPages, OnPageChange }){
    const goPrev = () => {
        if (currentPage > 1){
            OnPageChange(currentPage - 1);
        }
    };

    const goNext = () => {
        if (currentPage < totalPages) {
            OnPageChange(currentPage + 1);
        }
    };

    return(
        <PaginationContainer>
            <PageButton onClick={goPrev} disabled={currentPage === 1}>
                Prev
            </PageButton>
            <PageInfo>
                Page {currentPage} of {totalPages}
            </PageInfo>
            <PageButton onClick={goNext} disabled={currentPage === totalPages}>
                Next
            </PageButton>
        </PaginationContainer>
    );
}

export default Pagination;