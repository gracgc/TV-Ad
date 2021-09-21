import React, {useEffect, useRef, useState} from 'react'
import c from './Main.module.css'
import AdForm from "./AdForm";
import socket from "../../socket/socket";

import {adAPI} from "../../api/api";
import Item from "./Item";


const Main = (props: any) => {


    let [size, setSize] = useState<string>('medium')

    let [position, setPosition] = useState<string>('topRight')

    let [time, setTime] = useState<number>(30)

    let timeRef = useRef<any>(null)

    let inputTime = (value: any) => {
        if (!isNaN(value)) {
            setTime(value)
        }
    }

    useEffect(() => {
        socket.on(`getAds`, ads => {
                props.setAds(ads)
            }
        )
    }, [])


    let clearAd = () => {
        adAPI.clearAd()
    }


    // @ts-ignore
    return (
        <div className={c.main}>
            <div style={{padding: 30}}>
                <h2>Goods</h2>

                {props.ads.length === 0 ? <div>No ads now</div> : props.ads.map((a: object) => <Item a={a} size={size}
                                                                                           position={position}
                                                                                           time={time}/>)}

                <div>
                    Add item
                </div>
                <AdForm setAds={props.setAds}/>

            </div>
            <div>
                <div style={{marginRight: 20}}>
                    <h1><a href={props.link}>{props.name}</a></h1>
                </div>

                <div style={{fontSize: 22}}>
                    Size
                </div>
                <div className={c.sizeMenu}>
                    <div className={size === 'small' ? c.chosenSize : c.sizeChoose} onClick={e => {
                        setSize('small')
                    }}>
                        Small
                    </div>
                    <div className={size === 'medium' ? c.chosenSize : c.sizeChoose} onClick={e => {
                        setSize('medium')
                    }}>
                        Medium
                    </div>
                    <div className={size === 'large' ? c.chosenSize : c.sizeChoose} onClick={e => {
                        setSize('large')
                    }}>
                        Large
                    </div>
                </div>

                <div style={{fontSize: 22}}>
                    Position
                </div>

                <div className={c.positionMenu}>
                    <div className={position === 'topLeft' ? c.chosenPosition : c.positionChoose} onClick={e => {
                        setPosition('topLeft')
                    }}>
                        Top-Left
                    </div>
                    <div></div>
                    <div className={position === 'topRight' ? c.chosenPosition : c.positionChoose} onClick={e => {
                        setPosition('topRight')
                    }}>
                        Top-Right
                    </div>
                    <div></div>
                    <div className={position === 'centre' ? c.chosenPosition : c.positionChoose} onClick={e => {
                        setPosition('centre')
                    }}>
                        Centre
                    </div>
                    <div></div>
                    <div className={position === 'bottomLeft' ? c.chosenPosition : c.positionChoose} onClick={e => {
                        setPosition('bottomLeft')
                    }}>
                        Bottom-Left
                    </div>
                    <div></div>
                    <div className={position === 'bottomRight' ? c.chosenPosition : c.positionChoose} onClick={e => {
                        setPosition('bottomRight')
                    }}>
                        Bottom-Right
                    </div>
                </div>

                <div style={{fontSize: 22}}>
                    Time
                </div>
                <div style={{marginBottom: 20}}>
                    <input value={time} ref={timeRef} onChange={e => inputTime(+timeRef.current.value)}
                           type="adTime"/> seconds
                </div>

                <button style={{cursor: 'pointer'}} onClick={e => {
                    clearAd()
                }}>Clear ad from TV
                </button>

            </div>

        </div>
    )
};


export default Main;