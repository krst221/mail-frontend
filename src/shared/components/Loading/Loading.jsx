import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";
import './Loading.scss'

function Loading(promise) {

  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
    {(promiseInProgress) ? <div className="lds-dual-ring"></div> : null}
    </>
  )
}

export default Loading