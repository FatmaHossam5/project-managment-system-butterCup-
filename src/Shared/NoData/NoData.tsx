import React from 'react'
import DataEmpty from '../../assets/No data-rafiki.png';
export default function NoData() {
    return (
        <>
            <div className="text-center"><img className="w-50 " src={DataEmpty} alt="notfound" /></div>
        </>
    )
}
