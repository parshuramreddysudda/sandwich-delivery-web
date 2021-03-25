import React, { useLayoutEffect } from 'react';

const DynamicTable = ({ columns, data }) => {
    useLayoutEffect(()=>{
        
    }, [data]);
    return (
        <div className="dynamic-table">
            {data && data.length>0&& Array.isArray(data) && (
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key = {index}>{column.headerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                   
                        {data.map( (row, rowIndex) => (
                            <tr key = {rowIndex}>
                                {columns.map( (column, colIndex) => (
                                    <td key = {rowIndex * colIndex + colIndex}>
                                        {row[column.name]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {(!data || !Array.isArray(data)) && (
                <p>No Data Available</p>
            )}

            {data.length==0&&(<p>No Order this Time</p>)}
        </div>
    );
}
 
export default DynamicTable;