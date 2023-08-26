import React from "react";

/**
 * Component for rendering a footer section with pagination and delete functionality.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {number} props.page - The current page number.
 * @param {number[]} props.pageNumbers - An array of page numbers.
 * @param {Function} props.handlePageChange - The function to handle page changes.
 * @param {Function} props.handleDeleteMultiple - The function to handle multiple deletion.
 */
function Footer({ page, pageNumbers, handlePageChange, handleDeleteMultiple }) {
  return (
    <div className="d-flex gap-2 align-content-center justify-content-start gap-5">
      <div className="d-flex gap-2 align-content-center justify-content-center my-3 ">
        {/* Delete Selected Button */}
        <button className="btn btn-danger" onClick={handleDeleteMultiple}>
          Delete Selected
        </button>
      </div>
      <div className="d-flex gap-2 align-content-center justify-content-center my-3">
        {/* Pagination Buttons */}
        {page !== 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="btn btn-outline-primary rounded-pill"
            >
              {"<<"}
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              className="btn btn-outline-primary rounded-pill"
            >
              {"<"}
            </button>
          </>
        )}

        {pageNumbers.map(
          (pageNum) =>
            pageNum === page && (
              <button
                key={pageNum}
                type="button"
                className={`btn btn-outline-primary pagination-button ${
                  pageNum === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
        )}

        {page !== pageNumbers.length && (
          <>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="btn btn-outline-primary rounded-pill"
            >
              {">"}
            </button>
            <button
              onClick={() => handlePageChange(pageNumbers.length)}
              className="btn btn-outline-primary rounded-pill"
            >
              {">>"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;
