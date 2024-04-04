import React, { ChangeEvent } from 'react'
import { CiSearch } from 'react-icons/ci'
import styles from './input.module.css'

interface InputProps {
  getSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const Input: React.FC<InputProps> = ({ getSearchValue, placeHolder }) => {
  return (
    <>
      <div className="col-md-3">
        <div className="search position-relative">
          <CiSearch className={`position-absolute ${styles.searchIcon}`} />
          <input
            onChange={getSearchValue}
            type="text"
            className={`form-control ${styles.searchInput} rounded-5`}
            placeholder={placeHolder}
          />
        </div>
      </div>
    </>
  )
}
export default Input
