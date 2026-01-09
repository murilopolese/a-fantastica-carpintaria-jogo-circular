import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Cover from './views/Cover'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Cover />
  </StrictMode>,
)
