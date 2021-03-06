import React, { Component } from 'react'
import axios from 'axios';
import MaterialTable from 'material-table';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FS from '../../controller.js';

export default class EnrouteTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`/api/airports/${this.props.code}/enroute`)
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false
                });
            });
    }

    render() {
        const { data, loading } = this.state
        return (
            <div className="table-wrapper">
                <div className="airport-page-table-inner">
                    {!loading ?
                    <>
                    <MaterialTable 
                        title="En Route"
                        options={{
                            search: false,
                            pageSize: 10,
                            headerStyle: {
                                backgroundColor: '#002F5D',
                                color: '#FFF'
                            },
                            cellStyle: {
                                fontFamily: 'Helvetica-Light',
                                padding: '10px'
                            },
                            rowStyle: rowData => ({
                                backgroundColor: rowData.cancelled ? '#FF000055' : '#00000000'
                            })
                        }}
                        columns={[
                            {title: "Ident", field: "ident", render: rowData => <Link to={`/flightinfo/${rowData.id}`}>{rowData.ident}</Link>},
                            {title: "Type", field: "type"},
                            {title: "From", field: "from"},
                            {
                                title: "Depart", 
                                field: "depart",
                                render: rowData => rowData.departEstimated ? <div className="estimated-time">{FS.makeTime(rowData.depart)}</div> : FS.makeTime(rowData.depart)
                            },
                            {
                                title: "Arrive", 
                                field: "arrive", 
                                render: rowData => rowData.arriveEstimated ? <div className="estimated-time">{FS.makeTime(rowData.arrive)}</div> : FS.makeTime(rowData.arrive),
                            },
                            {title: "Gate", field: "gate"}
                        ]}
                        data={data.map(flight => (
                            {
                                ident: flight.flight_number,
                                id: flight.id,
                                arriveEstimated: FS.getArrivalTime(flight).estimated,
                                departEstimated: FS.getDepartureTime(flight).estimated,
                                type: flight.aircraft_type, 
                                from: flight.origin,
                                depart: FS.getDepartureTime(flight).time, 
                                arrive: FS.getArrivalTime(flight).time,
                                gate: FS.getArrivalGate(flight),
                                cancelled: flight.cancelled
                            } 
                         ))}
                    />
                    </>
                    :
                    <div className="airport-table-spinner">
                        <Spinner animation="border" variant="primary" />
                    </div> 
                    }
                    
                </div>
            </div>
        )
    }
}
