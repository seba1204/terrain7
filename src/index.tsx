/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    App()
)