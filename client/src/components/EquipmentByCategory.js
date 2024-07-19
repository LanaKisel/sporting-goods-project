import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EquipmentPictures from './EquipmentPictures';
import { Spin } from 'antd';

import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetCategoryByNameQuery, useGetEquipmentsByCategoryQuery } from "../services/sportingGoodsApi"

const EquipmentByCategory = () => {
    let { category_name } = useParams()
    const { data: category } = useGetCategoryByNameQuery(category_name ?? skipToken)
    const { data: equipments, isFetching: fetchingEquipments, isUninitialized:queryNotStarted } = useGetEquipmentsByCategoryQuery(category?.id ?? skipToken)

    const equipment = !!equipments && equipments.map(e => (
        <div key={e.id} className="equipment_pic">
            <EquipmentPictures pictures={e.pictures} />
            <Link style={{ marginLeft: 'auto', marginRight: 'auto' }} to={`/equipments/${e.id}`}>{e.name}</Link>
            <br />
            <br />
        </div>
    ))

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>{category_name}</h2>
            {(equipments && equipments.length > 0 ?
                equipment
                :
                (fetchingEquipments || queryNotStarted ? <Spin fullscreen /> : <h3 style={{ textAlign: "center" }}>There are no equipments for this category</h3>))}
        </div>
    )
}

export default EquipmentByCategory
