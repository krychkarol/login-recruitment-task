import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const DummyPage = () => {

    const navigate = useNavigate();
    const [dummy, setDummy] = useState("");

    const { state } = useLocation();

    const getMyDummyData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/${state.username}`, { headers: { token: `Bearer ${state.token}` } })
            setDummy(res.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!state) {
            navigate(`/`)
        }
        else {
            getMyDummyData();
        }
    }, []);

    return (
        <>
            {dummy && <div>{dummy.dummy} </div>}
        </>
    )
}

export default DummyPage