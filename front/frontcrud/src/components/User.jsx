import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const User = () => {
    const { id } = useParams();
    const [user, setUsr] = useState({})



    useEffect(() => {
        const getUserById = async (id) => {
            try {
                const { data } = await axios.get('/userid/' + id)
                setUsr(data.user)

            } catch (error) {
                if (!error.response.data.ok) {
                    return alert(error.response.data.message);
                }
                console.log("error en findByUserId", error.message)
            }
        }
        getUserById(id)
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            {/* inicio card usuario */}
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <h3 className="card-title">{user.name}</h3>
                            <div className="card-body">
                                <p>{user.salary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
