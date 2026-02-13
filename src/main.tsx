import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return <h1>Hello from Scratch!</h1>
}
const root = document.getElementById('root');
if(root){
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}

