import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createTheme, ThemeProvider} from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router';
import BaseLayout from './components/BaseLayout'
import HomePage from './components/HomePage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e4157',
      light: '#9dbad2',
      dark: '#0b2c3f'
    },
    secondary: {
      main: '#57351e',
      light: '#9f7e66',
      dark: '#3a1b0c'
    }
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </BaseLayout>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
