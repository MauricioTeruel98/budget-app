import React from 'react';
import swal from 'sweetalert';

const Form = ({ item, setItem }) => {

    const handleChange = e => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    let { concept, amount, type, create_time } = item

    const handleSubmit = () => {
        //validación de los datos
        amount = parseFloat(amount, 10)

        var today = new Date();
        var dateForm = Date.parse(create_time);

        if (concept === '' || amount <= 0 || type === '' || create_time === '') {
            alert(
                'All fields are required'
            );

        } else if (dateForm > today) {

            alert('The date cannot be greater than the current date');

        } else {

            //consulta
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
                alert("Wrong field, won't save")
            }

            swal(
                'Item saved',
                '',
                'success'
            );

            //reiniciando state
            setItem({
                concept: '',
                amount: '',
                type: '',
                date: ''
            })

        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="concept" className="form-label">Concept</label>
                <input value={concept} name="concept" onChange={handleChange} type="text" id="concept" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select className="form-control" name="type" onChange={handleChange} id="type" value={type}>
                    <option value={''}></option>
                    <option value={'ingress'}>Ingress</option>
                    <option value={'egress'}>Egress</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input value={amount} name="amount" onChange={handleChange} type="number" id="amount" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="create_time" className="form-label">Date</label>
                <input value={create_time} name="create_time" onChange={handleChange} type="date" id="type" className="form-control" />
            </div>
            <button type="submit" className="btn btn-outline-success">Submit</button>
        </form>
    );
}

export default Form;