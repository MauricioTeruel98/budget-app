import React, { useEffect } from 'react';
import swal from 'sweetalert';

const Form = ({ item, setItem, dataToEdit, setDataToEdit, handleUpdate, setListUpdated }) => {

    const handleChange = e => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (dataToEdit) {
            setItem(dataToEdit)
        } else {
            setItem({
                id: null,
                concept: '',
                amount: '',
                type: '',
                create_time: ''
            })
        }
    }, [dataToEdit, setItem]);

    let { concept, amount, type, create_time } = item;

    const handleSubmit = () => {

        //Data validation

        amount = parseFloat(amount, 10);

        var today = new Date();
        var dateForm = Date.parse(create_time);

        if (concept === '' || amount <= 0 || type === '' || create_time === '') {

            alert('All fields are required');

        } else if (dateForm > today) {

            alert('The date cannot be greater than the current date');

        } else {

            if (item.id === null) {

                const requestInit = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                }

                if (type === 'ingress' || type === 'egress') {
                    fetch('http://localhost:3200/insert/', requestInit)
                        .then(res => res.text())
                        .then(res => console.log(res))
                } else {
                    swal(
                        '',
                        "Wrong field, won't save",
                        'danger'
                    );
                }

                swal(
                    'Item SAVED',
                    'Item saved successfully',
                    'success'
                );

                setListUpdated(true);

                //Restarting state

                setItem({
                    concept: '',
                    amount: '',
                    type: '',
                    date: ''
                });


            } else {

                handleUpdate(item.id);

            }

        }

    }

    const handleReset = () => {
        setItem({
            concept: '',
            amount: '',
            type: '',
            create_time: ''
        });
        setDataToEdit(null);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="concept" className="form-label">Concept</label>
                <input value={concept} name="concept" onChange={handleChange} type="text" id="concept" className="form-control" />
            </div>
            <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
                {
                    dataToEdit ? (
                        <div className="alert alert-danger" role="alert">
                            The TYPE field cannot be modified.
                        </div>
                    ) : (
                        <div>
                            <select className="form-control" name="type" onChange={handleChange} id="type" value={type}>
                                <option value={''}></option>
                                <option value={'ingress'}>Ingress</option>
                                <option value={'egress'}>Egress</option>
                            </select>
                        </div>
                    )
                }
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input value={amount} name="amount" onChange={handleChange} type="number" id="amount" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="create_time" className="form-label">Date</label>
                <input value={create_time} name="create_time" onChange={handleChange} type="date" id="type" className="form-control" />
            </div>
            {
                dataToEdit ? (
                    <button type="submit" className="btn btn-edit btn-primary">Update</button>
                ) : (
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                )
            }
            <button type="reset" className="btn btn-clean btn-success" onClick={handleReset}>Clean</button>
        </form>
    );
}

export default Form;