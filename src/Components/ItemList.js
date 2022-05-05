import React, { useEffect, useState } from 'react';
import moment from 'moment';
import swal from "sweetalert";
import { formatter } from '../helpers/utils';

const ItemList = ({ item, setItem }) => {

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
    }, [listUpdated])


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

                    setListUpdated(true) //Se actualiza la lista

                    swal(
                        'Item Deleted',
                        'Item deleted successfully',
                        'success'
                    );

                } else {
                    swal(
                        "Don't worry, it didn't get erased",
                    )
                }
            });

        setListUpdated(true);

    }

    let { concept, amount, type, create_time } = item
    const handleUpdate = id => {
        //validación de los datos
        amount = parseFloat(amount, 10)
        if (concept === '' || amount <= 0 || type === '' || create_time === '') {
            swal(
                '',
                'All fields are required',
                'warning'
            );
            return;

        }else if(type.value !== type){

            swal(
                '',
                'The TYPE field cannot be modified',
                'warning'
            );
            return;

        } else {

            swal({
                title: "Are you sure?",
                text: "You will update this record",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willUpdate) => {
                    if (willUpdate) {

                        const requestInit = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(item)
                        }
                        fetch('http://localhost:3200/modify/' + id, requestInit)
                            .then(res => res.text())
                            .then(res => console.log(res));

                        swal(
                            'Item Updated',
                            'Item Updated successfully',
                            'success'
                        );

                        //reiniciando state
                        setItem({
                            concept: '',
                            amount: '',
                            type: '',
                            create_time: ''
                        })

                    } else {
                        swal(
                            "Don't worry, it didn't get erased"
                        )
                    }
                });


        }

        setListUpdated(true)
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
                            <tr key={item.id} className='egress td'>
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
                                        <button onClick={() => handleUpdate(item.id)} className="btn-sm btn btn-primary">Upd</button>
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
                            <tr key={item.id} className='ingress td'>
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
                                        <button onClick={() => handleUpdate(item.id)} className="btn-sm btn btn-primary">Upd</button>
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