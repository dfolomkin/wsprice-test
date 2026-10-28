import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/global.less'

import { App } from './pages/App'

createRoot(document.getElementById('root')!).render(<App />)
