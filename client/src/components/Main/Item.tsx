import React, {useEffect, useRef, useState} from 'react'
import c from './Main.module.css'


import {adAPI} from "../../api/api";
import {ErrorMessage, Field, Form, Formik, getIn} from "formik";


const Item = (props: any) => {

    let [isEditItem, setIsEditItem] = useState<boolean>(false)


    let deleteAd = (id: string) => {
        adAPI.deleteAd(id)
    }


    let pushAd = (adLink: string) => {
        adAPI.pushAd(adLink, props.time, props.size, props.position)
    }


    return (
        <div>
            {isEditItem
                ? <ChangeAdForm a={props.a} setIsEditItem={setIsEditItem}/>
                : <div className={c.itemMenu}>
                    <div style={{width: '25%'}}>
                        <a href={props.a.link} target='_blank'>{props.a.name}</a>
                    </div>
                    <button className={c.itemButton} onClick={e => {
                        pushAd(props.a.link)
                    }}>Set on TV
                    </button>

                    <button onClick={e => {
                        setIsEditItem(true)
                    }} className={c.itemButton}>
                        ✐
                    </button>

                    <button onClick={e => deleteAd(props.a.id)} style={{color: 'red'}} className={c.itemButton}>
                        ×
                    </button>
                </div>
            }


        </div>
    )
};

const ChangeAdForm = (props: any) => {

    interface Values {
        name: string;
        link: string;
    }


    const validate = (values: Values) => {
        let errors: any = {};
        if (!values.name) {
            errors.name = '!';
            console.log(errors)
        }

        if (!values.link) {
            errors.link = '!';
        }
        return errors;
    }

    const onSubmit = (values: Values) => {
        adAPI.changeAd({name: values.name, link: values.link, id: props.a.id})
        props.setIsEditItem(false)
    }

    return (
        <div>
            <Formik
                initialValues={{name: props.a.name, link: props.a.link}}
                validate={validate}
                onSubmit={onSubmit}
            >
                {(formProps) => (
                    <Form>
                        <div style={{display: 'inline-flex', marginBottom: 20}}>
                            <div style={{marginRight: 20, display: 'inline-flex'}}>
                                <Field
                                    style={{border: formProps.touched.name && formProps.errors.name && '1px solid red'}}
                                    placeholder="Name" type="name" name="name"/>
                                    <div style={{color: 'red'}}>
                                        <ErrorMessage name="name" component="div"/>
                                    </div>

                            </div>
                            <div style={{marginRight: 20, display: 'inline-flex'}}>
                                <Field
                                    style={{border: formProps.touched.link && formProps.errors.link && '1px solid red'}}
                                    placeholder="Link" type="link" name="link"/>
                                <div style={{color: 'red'}}>
                                    <ErrorMessage name="link" component="div"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit">
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default Item;