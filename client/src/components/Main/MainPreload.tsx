import React, {useEffect, useState} from 'react'
import Main from "./Main";

import {adAPI} from "../../api/api";


const MainPreload = (props: any) => {

    let [ads, setAds] = useState<[] | null>(null)

    useEffect(() => {
        adAPI.getAd().then(r => {
            setAds(r)
        })
    }, [])


    return (
        <div>
            {ads !== null && <Main ads={ads} setAds={setAds}/>}
        </div>
    )
};

export default MainPreload;