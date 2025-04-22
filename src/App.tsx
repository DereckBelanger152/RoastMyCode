import { ThemeProvider } from "./contexts/ThemeContext";
import { RoastProvider } from "./contexts/RoastContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider>
      <RoastProvider>
        <Layout>
          <HomePage />
        </Layout>
      </RoastProvider>
    </ThemeProvider>
  );
}

export default App;
