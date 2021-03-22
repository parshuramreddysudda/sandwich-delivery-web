import React, { Component } from 'react'

export default class componentName extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <>
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            {this.props.header}
                            <tr>
                                {this.props.headings.map((item) => (
                                    <th>{item.name}</th>
                                ))
                                }

                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>

                            {this.props.tableData.map((item) => (
                                <tr>
                                    {item.map((data) => (
                                        <td>data</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
