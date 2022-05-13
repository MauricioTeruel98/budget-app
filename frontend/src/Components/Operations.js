import React, { Fragment, useState, useEffect } from 'react';
import ItemList from './ItemList';
import Form from './Form';
import swal from 'sweetalert';


const Operations = () => {

    const [dataToEdit, setDataToEdit] = useState(null);

    const [item, setItem] = useState({
        id: null,
        concept: '',
        amount: '',
        type: '',
        create_time: ''
    });

    const [items, setItems] = useState([]);

    const [listUpdated, setListUpdated] = useState(false);

    useEffect(() => {
        const getItems = () => {
            fetch('http://localhost:3200/list')
                .then(res => res.json())
                .then(res => setItems(res))
        }
        getItems()
        setListUpdated(false)
    }, [listUpdated])


    const handleUpdate = (id) => {

        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        }
        fetch('http://localhost:3200/modify/' + id, requestInit)
            .then(res => res.text());

        setListUpdated(true)

        swal(
            '',
            'Item Updated',
            'success'
        );

        //Restarting state

        setItem({
            concept: '',
            amount: '',
            type: '',
            create_time: ''
        });

    }


    return (

        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 container-sm">
                        <h1 style={{ textAlign: 'center' }}>{dataToEdit ? 'Update Form' : 'Form'}</h1><br />
                        <Form
                            item={item}
                            dataToEdit={dataToEdit}
                            setItem={setItem}
                            handleUpdate={handleUpdate}
                            setDataToEdit={setDataToEdit}
                        />
                    </div>
                </div><br />
                <hr></hr>
                <div><br />
                    <div>
                        <ItemList
                            item={item}
                            items={items}
                            setDataToEdit={setDataToEdit}
                            setListUpdated={setListUpdated}
                            setItem={setItem}
                        />
                    </div>
                </div>
            </div>
        </Fragment>

    );

}

export default Operations;
