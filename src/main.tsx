import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'
import App from './app/index.tsx'
import reportWebVitals from './reportWebVitals.ts'
import { enableMocking } from './testing/mocks'

const root = document.getElementById('app')
if (!root) throw new Error('Root element not found')

const appRoot = createRoot(root)

async function bootstrap() {
  await enableMocking()

  appRoot.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
