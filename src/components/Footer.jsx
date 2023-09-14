import React, { useEffect, useState } from "react";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update windowWidth when the window is resized
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerClasses = windowWidth < 480 ? "flex-column" : "gap-5";
  const btnResponsive = windowWidth < 480 ? "btn-sm" : "";

  return (
    <div
      className={`d-flex ${containerClasses} align-content-center justify-content-start mb-3`}
    >
      <div className="d-flex gap-2 align-content-center justify-content-center my-3 ">
        {/* Delete Selected Button */}
        <button
          className={`btn ${btnResponsive} btn-danger`}
          onClick={handleDeleteMultiple}
        >
          Delete Selected
        </button>
      </div>
      <div className="d-flex gap-2 align-content-center justify-content-center my-3">
        {/* Pagination Buttons */}
        {page !== 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`btn btn-outline-primary rounded-pill ${btnResponsive}`}
            >
              {"<<"}
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              className={`btn btn-outline-primary rounded-pill ${btnResponsive}`}
            >
              {"<"}
            </button>
          </>
        )}

        {pageNumbers.map(
          (pageNum) =>
            pageNum <= 10 && (
              <button
                key={pageNum}
                type="button"
                className={`btn btn-outline-primary pagination-button ${btnResponsive} ${
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
              className={`btn btn-outline-primary rounded-pill ${btnResponsive}`}
            >
              {">"}
            </button>
            <button
              onClick={() => handlePageChange(pageNumbers.length)}
              className={`btn btn-outline-primary rounded-pill ${btnResponsive}`}
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
