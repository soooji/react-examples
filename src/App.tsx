import { use } from "react";
import { getCart } from "./mockServer";
import ProductList from "./ProductList";
import ThemeToggle from "./components/ThemeToggle";
import useTheme from "./lib/useTheme";

const cartPromise = getCart();

function App() {
  const initialCart = use(cartPromise);
  const { theme, toggle } = useTheme();

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggle} />
      <ProductList initialCart={initialCart} />
    </>
  );
}

export default App;
