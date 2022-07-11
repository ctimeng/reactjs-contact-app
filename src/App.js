import './App.css';
import Create from "./components/contact/Create"
import Edit from "./components/contact/Edit"
import Index from './components/contact'
import List from './components/contact/List'
import NoPage from './components/NoPage';

import { BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} >
          <Route index element={<List />} />
          <Route path="create" element={<Create />} />
          <Route path=":id/edit" element={<Edit />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
