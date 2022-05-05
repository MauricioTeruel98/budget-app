import React, { Fragment, useState, useEffect } from 'react';
import ItemList from './ItemList';
import Form from './Form';


const Operations = () => {

    const [item, setItem] = useState({
        concept: '',
        amount: '',
        type: '',
        create_time: ''
    })

    const [items, setItems] = useState([])

    const [listUpdated, setListUpdated] = useState(false)

    useEffect(() => {
        const getItems = () => {
            fetch('http://localhost:3200/list')
                .then(res => res.json())
                .then(res => setItems(res))
        }
        getItems()
        setListUpdated(false)
    }, [listUpdated])

    return (

        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 container-sm">
                        <h1 style={{ textAlign: 'center' }}>Form</h1><br/>
                        <Form item={item} setItem={setItem} />
                    </div>
                </div><br/>
                <hr></hr>
                <div><br/>
                    <div>
                        <ItemList item={item} setItem={setItem} items={items} setListUpdated={setListUpdated} />
                    </div>
                </div>
            </div>
        </Fragment>

    );

}

export default Operations;
