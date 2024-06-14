import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CurrencySwap from 'pages/CurrencySwap'

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<CurrencySwap />}></Route>
    </Routes>
  </Router>
)

export default App
