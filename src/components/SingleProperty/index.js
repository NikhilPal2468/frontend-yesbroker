import React from 'react'
import styles from './styles.module.css'
import { useParams } from 'react-router-dom';
const SingleProperty = () => {
    const { id } = useParams();
    console.log("id:", id)
    return (
        <div className={styles.single_property}>
            SingleProperty
        </div>
    )
}

export default SingleProperty