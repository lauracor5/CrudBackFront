import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from 'rc-pagination';

export const Crud = () => {

    useEffect(() => {
        getData(page)
    }, []);

    const [users, setUser] = useState([]);
    const [edit, setEdit] = useState(false);

    const [dataForm, setDataForm] =
        useState({
            name: '',
            lastname: '',
            email: '',
            salary: 0
        });

     const [page, setPage]= useState(1);
     const [totalPages, setTotalPages] = useState('');



    const getData = async (pageCurrent) => {
        const { data } = await axios.get(`/list/?page=${pageCurrent}`);
        setUser(data.users.docs);
        setPage(data.users.page)
        setTotalPages(data.users.totalPages)
    }

    const onChangePage = (page)=>{
        getData(page)
    }

    const cleanData = () => {
        setDataForm({
            name: '',
            lastname: '',
            email: '',
            salary: 0
        });
        setEdit(false)
    }




    const saveUser = async () => {
        try {
            await axios.post('/', dataForm)
            getData();
            cleanData();
        } catch (error) {
            console.log(error);
            if (!error.response.data.ok) {
                return alert(error.response.data.message)
            }
            console.log('error en deleteUser', error.message)
        }
    };


    const deleteUser = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete('/userid/' + id)
                    getData();
                    Swal.fire({
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        } catch (error) {
            if (!error.response.data.ok) {
                return alert(error.response.data.message)
            }
            console.log('error en deleteUser', error.message)
        }
    }

    const completeDataFields = (item) => {
        setEdit(true);
        setDataForm({
            name: item.name,
            lastname: item.lastname,
            email: item.email,
            salary: item.salary
        })
        localStorage.setItem('id', item._id)
    }

    const updateUser = async () => {
        try {
            const id = localStorage.getItem('id')

            const { data } = await axios.put('/userid/' + id, dataForm);

            getData()
            cleanData()
            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            if (!error.response.data.ok) {
                return alert(error.response.data.message);
            }
        }
    }

    const actions = (e) => {
        e.preventDefault();
        edit ? updateUser() : saveUser()
    }


    return (
        <div className='container'>
            {/* empieza formulario para guardar o actualizar*/}
            <div className="d-flex justify-content-center mt-5">
                <div className="col-12 col-md-8">
                    <h1 className="card-title text-center">CRUD</h1>
                    <div className="card-body">
                        <form onSubmit={actions}>
                            <div className="mb-3">
                                <input type="text" placeholder="name" className="form-control" required
                                    value={dataForm.name}
                                    onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder="Lastname" className="form-control" required
                                    value={dataForm.lastname}
                                    onChange={(e) => setDataForm({ ...dataForm, lastname: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="email" placeholder="Email" className="form-control" required
                                    value={dataForm.email}
                                    onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })} />
                            </div>
                            <label className="form-label">Salary</label>
                            <div className="mb-3">
                                <input type="text" placeholder="salary" className="form-control"
                                    value={dataForm.salary}
                                    onChange={(e) => setDataForm({ ...dataForm, salary: e.target.value })} />
                            </div>
                            <input type="submit" value="Save" className="btn btn-primary form-control" />
                        </form>
                    </div>
                </div>
            </div>
            {/* Termina el formulario */}

            {/* Inicio de la tabla donde se muestran los usuarios */}
            <table className="table mt-5 table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, i) => (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                <td><Link to={'/userid/' + item._id}>{item.name}</Link></td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.salary}</td>
                                <td>
                                    <i className="btn btn-danger fas fa-trash me-2" onClick={() => deleteUser(item._id)}></i>
                                    <i className="btn btn-warning fas fa-edit" onClick={() => completeDataFields(item)}></i>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>
            </table>
            {/* fin table */}
            <div className="my-5 d-flex justify-content-center">
                    <Pagination 
                    className="pagination"
                    current={page}
                    total={totalPages}
                    pageSize={1}
                    onChange={onChangePage}
                        />
            </div>        


                
        </div>
    )
}
