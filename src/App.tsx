import './App.scss'
import {Pagination} from "./components/pagination/pagination.tsx";
import {usePagination} from "./hooks/usePagiation.ts";

const products = Array.from({ length: 1500 }, (_, index) => ({
  id: index + 1,
  title: `Product ${index + 1}`,
}));

const PRODUCTS_PER_PAGE = 15;

function App() {
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const { currentPage, nextPage, prevPage, nextStep, prevStep, goToPage, pages } = usePagination({
    totalPages,
    step: 5,
    isLooped: true,
  });

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
      <div>
        <h1>Products</h1>
        <div>
          {currentProducts.map((product) => (
              <div key={product.id}>
                {product.title}
              </div>
          ))}
        </div>

        <Pagination
            pages={pages}
            isLooped={true}
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            nextStep={nextStep}
            prevStep={prevStep}
            goToPage={goToPage}
        />
      </div>
  );
}

export default App
