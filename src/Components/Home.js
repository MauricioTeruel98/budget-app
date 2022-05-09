import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { formatter } from '../helpers/utils';

const Home = () => {

    const [itemsIngress, setItemsIngress] = useState([]);

    const [itemsEgress, setItemsEgress] = useState([]);

    const [items, setItems] = useState([]);

    const [listUpdated, setListUpdated] = useState(false);

    useEffect(() => {
        const getItemsIngress = () => {
            fetch('http://localhost:3200/ingress')
                .then(res => res.json())
                .then(res => setItemsIngress(res))
        }
        getItemsIngress()
        setListUpdated(false)
    }, [listUpdated]);

    useEffect(() => {
        const getItems = () => {
            fetch('http://localhost:3200/home')
                .then(res => res.json())
                .then(res => setItems(res))
        }
        getItems()
        setListUpdated(false)
    }, [listUpdated]);

    useEffect(() => {
        const getItemsEgress = () => {
            fetch('http://localhost:3200/egress')
                .then(res => res.json())
                .then(res => setItemsEgress(res))
        }
        getItemsEgress()
        setListUpdated(false)
    }, [listUpdated]);


    // Calculate the sum of all income

    var ingress = itemsIngress;
    var totalIngress = 0;

    ingress.forEach((element) => {
        totalIngress += parseFloat(element['amount']);
    })

    // Calculate the sum of all expenses

    var egress = itemsEgress;
    var totalEgress = 0;

    egress.forEach((element) => {
        totalEgress += parseFloat(element['amount']);
    })
    
    // Then form the balance
    
    var balance = totalIngress - totalEgress;

    return (

        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Home</h1><br />
            {
                balance < 0 ? (
                    <div>
                        <h1 className='balance-negative'>Balance: {formatter.format(balance)}</h1><br />
                    </div>
                ) : (
                    <div>
                        <h1 className='balance-positive'>Balance: {formatter.format(balance)}</h1><br />
                    </div>
                )
            }
            <div className=''>
                <h2>Last 10 Items</h2><br />
                <table className="table">
                    <thead>
                        <tr>
                            <th className='table-light'>ID</th>
                            <th className='table-light'>Concept</th>
                            <th className='table-light'>Type</th>
                            <th className='table-light'>Amount</th>
                            <th className='table-light'>Date</th>
                        </tr>
                    </thead>
                    <tbody className='tr'>
                        {items.map(item => (
                            <tr key={item.id} className={item.type}>
                                <td>{item.id}</td>
                                <td>{item.concept}</td>
                                <td>{item.type}</td>
                                {
                                    item.type === 'ingress' ? (
                                        <td> + {formatter.format(item.amount)}</td>
                                    ) : (
                                        <td> - {formatter.format(item.amount)}</td>
                                    )
                                }
                                <td>{moment(item.create_time).format('MM-DD-YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div><br/>
            <div className='row'>
                <h1 style={{ textAlign: 'center' }}>Inputs and Outputs</h1>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                    <div className='container-item'>
                        <h2 className='title__egress'>Egress</h2><br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='table-light'>ID</th>
                                    <th className='table-light'>Concept</th>
                                    <th className='table-light td-none'>Type</th>
                                    <th className='table-light'>Amount</th>
                                    <th className='table-light'>Date</th>
                                </tr>
                            </thead>
                            <tbody className='egressList tr'>
                                {itemsEgress.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.concept}</td>
                                        <td className='td-none'>{item.type}</td>
                                        <td> - {formatter.format(item.amount)}</td>
                                        <td>{moment(item.create_time).format('MM-DD-YYYY')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div><br/>
                    <div className='balance-negative'>
                        <h2>Total Egress : - {formatter.format(totalEgress)}</h2>
                    </div><br/>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                    <div className='container-item'>
                        <h2 className='title__ingress' >Ingress</h2><br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='table-light'>ID</th>
                                    <th className='table-light'>Concept</th>
                                    <th className='table-light td-none'>Type</th>
                                    <th className='table-light'>Amount</th>
                                    <th className='table-light'>Date</th>
                                </tr>
                            </thead>
                            <tbody className='ingressList tr'>
                                {itemsIngress.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.concept}</td>
                                        <td className='td-none'>{item.type}</td>
                                        <td> + {formatter.format(item.amount)}</td>
                                        <td>{moment(item.create_time).format('MM-DD-YYYY')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div><br/>
                    <div className='balance-positive'>
                        <h2>Total Ingress : + {formatter.format(totalIngress)}</h2>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Home;