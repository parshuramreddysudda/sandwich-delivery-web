import React, { useLayoutEffect } from 'react';
import './dynamic-table.css';

const DynamicTable = ({ columns, data, noDataAvailableText, checkout }) => {
    return (
        <div className="dynamic-table">
            {data && Array.isArray(data) && (
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column.headerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ display: data.length > 0 ? 'contents' : 'block' }}>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (

                                    <td key={rowIndex * colIndex + colIndex} onClick={() => column.actionHandler ? checkout(rowIndex) : ''}>
                                        { column.actionHandler && row[column.name] === column.actionValue ? <button> {row[column.name]}</button> : row[column.name]}
                                    </td>
                                )
                                )}
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}

            {(!data || !Array.isArray(data)) && (
                <p>Invalid Data format</p>
            )}
            {data && data.length === 0 && noDataAvailableText && (<p>{noDataAvailableText}</p>)}
            {data && data.length === 0 && !noDataAvailableText && (<p>No Table Data Available</p>)}

        </div>
    );
}

export default DynamicTable;