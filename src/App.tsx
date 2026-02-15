import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
