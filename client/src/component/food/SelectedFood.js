import React from 'react';

const SelectedFood = (props) => (
    <table className='ui selectable structured large table'>
        <thead>
        <tr>
            <th colSpan='5'>
                <h3>Selected foods</h3>
            </th>
        </tr>
        <tr>
            <th className='eight wide'>Description</th>
            <th>Kcal</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Carbs (g)</th>
        </tr>
        </thead>
        <tbody>
        {
            props.foods.map((food, idx) => (
                <tr
                    key={idx}
                    onClick={() => props.onFoodRemove(idx)}
                >
                    <td>{food.description}</td>
                    <td className='right aligned'>{food.kcal}</td>
                    <td className='right aligned'>{food.sugar_g}</td>
                    <td className='right aligned'>{food.carbohydrate_g}</td>
                    <td className='right aligned'>{food.protein_g}</td>
                </tr>
            ))
        }
        </tbody>
        <tfoot>
        <tr>
            <th>Total</th>
            <th className='right aligned'>
                {props.foods.reduce((memo, f) => f.kcal + memo, 0)}
            </th>
            <th className='right aligned'>
                {props.foods.reduce((memo, f) => f.sugar_g + memo, 0).toFixed(2)}
            </th>
            <th className='right aligned'>
                {props.foods.reduce((memo, f) => f.carbohydrate_g + memo, 0).toFixed(2)}
            </th>
            <th className='right aligned'>
                {props.foods.reduce((memo, f) => f.protein_g + memo, 0).toFixed(2)}
            </th>
        </tr>
        </tfoot>
    </table>
);

export default SelectedFood;