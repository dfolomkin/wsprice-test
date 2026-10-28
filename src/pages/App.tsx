import React from 'react'
import { Provider } from 'react-redux'

import { store } from '../store'
import { Catalog } from './Catalog'

export const App: React.FC = () => (
  <Provider store={store}>
    <div className="container">
      <Catalog />
    </div>
  </Provider>
)
