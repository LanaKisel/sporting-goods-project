import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EquipmentPictures from './EquipmentPictures';

import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetCategoryByNameQuery, useGetEquipmentsByCategoryQuery } from "../services/sportingGoodsApi"

const EquipmentByCategory = () => {
    let { category_name } = useParams()
    const { data: category } = useGetCategoryByNameQuery(category_name ?? skipToken)
    const { data: equipments } = useGetEquipmentsByCategoryQuery(category?.id ?? skipToken)

    const equipment = !!equipments && equipments.map(e => (
        <div key={e.id} className="equipment_pic">
            <EquipmentPictures pictures={e.pictures} />
            <Link style={{marginLeft: 300}}to={`/equipments/${e.id}`}>{e.name}</Link>
            <br />
            <br />
        </div>
    ))

    return (
        <div>
            <h2 style = {{textAlign:"center"}}>{category?.name}</h2>
            {equipment}
        </div>
    )
}

export default EquipmentByCategory
