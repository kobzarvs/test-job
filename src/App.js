import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TestJob1 } from './pages/TestJob1'
import { TestJob2 } from './pages/TestJob2'
import { TestJob3 } from './pages/TestJob3'
import { PageNotFound } from './pages/PageNotFound'
import './styles.scss'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/test-job1" />
          </Route>
          <Route path="/test-job1" component={TestJob1} />
          <Route path="/test-job2" component={TestJob2} />
          <Route path="/test-job3" component={TestJob3} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
