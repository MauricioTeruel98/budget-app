import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { formatter } from '../helpers/utils';
import swal from 'sweetalert';

const ItemList = ({ setDataToEdit, setItem }) => {

    const [itemsIngress, setItemsIngress] = useState([])

    const [itemsEgress, setItemsEgress] = useState([])

    const [listUpdated, setListUpdated] = useState(false)


    useEffect(() => {
        const getItemsIngress = () => {
            fetch('http://localhost:3200/ingress')
                .then(res => res.json())
                .then(res => setItemsIngress(res))
        }
        getItemsIngress()
        setListUpdated(false)
    }, [listUpdated])

    useEffect(() => {
        const getItemsEgress = () => {
            fetch('http://localhost:3200/egress')
                .then(res => res.json())
                .then(res => setItemsEgress(res))
        }
        getItemsEgress()
        setListUpdated(false)
    }, [listUpdated]);

    const handleDelete = id => {

        swal({
            title: "Are you sure?",
            text: "You will permanently delete your Item",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    const requestInit = {
                        method: 'DELETE'
                    }
                    fetch('http://localhost:3200/delete/' + id, requestInit)
                        .then(res => res.text())
                        .then(res => console.log(res))

                    setListUpdated(true);

                    swal(
                        'Item Deleted',
                        'Item deleted successfully',
                        'success'
                    );

                    //Restarting state
                    
                    setItem({
                        concept: '',
                        amount: '',
                        type: '',
                        date: ''
                    });

                } else {
                    swal(
                        "Don't worry, it didn't get erased",
                    )
                }
            });

    }

    return (

        <div className='row'>
            <h1 style={{ textAlign: 'center' }}>Inputs and Outputs</h1>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                <h2 className='title__egress'>Egress</h2><br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='table-light'>ID</th>
                            <th className='table-light'>Concept</th>
                            <th className='table-light td-none'>Type</th>
                            <th className='table-light'>Amount</th>
                            <th className='table-light'>Date</th>
                            <th className='table-light'></th>
                        </tr>
                    </thead>
                    <tbody className='tr'>
                        {itemsEgress.map(item => (
                            <tr key={item.id} className='egress td' setDataToEdit={setDataToEdit}>
                                <td>{item.id}</td>
                                <td>{item.concept}</td>
                                <td className='td-none'>{item.type}</td>
                                <td> - {formatter.format(item.amount)}</td>
                                <td>{moment(item.create_time).format('MM-DD-YYYY')}</td>
                                <td>
                                    <div className="mb-2">
                                        <button onClick={() => handleDelete(item.id)} className="btn-del btn-sm btn btn-danger">Del</button>
                                    </div>
                                    <div className="mb-2">
                                        <button onClick={() => setDataToEdit(item)} className="btn-sm btn btn-primary">Upd</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table><br/>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                <h2 className='title__ingress' >Ingress</h2><br />
                <table className="table">
                    <thead>
                        <tr>
                            <th className='table-light'>ID</th>
                            <th className='table-light'>Concept</th>
                            <th className='table-light td-none'>Type</th>
                            <th className='table-light'>Amount</th>
                            <th className='table-light'>Date</th>
                            <th className='table-light'></th>
                        </tr>
                    </thead>
                    <tbody className='tr'>
                        {itemsIngress.map(item => (
                            <tr key={item.id} className='ingress td' setDataToEdit={setDataToEdit}>
                                <td>{item.id}</td>
                                <td>{item.concept}</td>
                                <td className='td-none'>{item.type}</td>
                                <td> + {formatter.format(item.amount)}</td>
                                <td>{moment(item.create_time).format('MM-DD-YYYY')}</td>
                                <td>
                                    <div className="mb-2">
                                        <button onClick={() => handleDelete(item.id)} className="btn-del btn-sm btn btn-danger">Del</button>
                                    </div>
                                    <div className="mb-2">
                                        <button onClick={() => setDataToEdit(item)} className="btn-sm btn btn-primary">Upd</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ItemList;