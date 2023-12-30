import styles from './Notfound.module.css'
import { Fragment } from 'react';

export default function Notfound() {
  return (
    <Fragment>

      <div className='d-flex justify-content-center align-items-center vh-100'>

        <div className="col-md-1">
          <h1 className={`${styles.font}`}>404</h1>
        </div>

        <div >
          <div className=' fs-2'>Page is Not found!</div>
        </div>
        
      </div>

    </Fragment>

  )
}
