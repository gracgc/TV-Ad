import React, {useEffect, useState} from 'react'
import c from './Main.module.css'
import {Formik, Form, Field, ErrorMessage, getIn} from 'formik';

import {adAPI} from "../../api/api";

const AdForm = (props: any) => {

    interface Values {
        name: string;
        link: string;
    }


    const validate = (values: Values) => {
        const errors: any = {};

        if (!values.name) {
            errors.name = '!'
        }

        if (!values.link) {
            errors.link = '!';
        }

        return errors;
    }

    const onSubmit = (values: Values, {resetForm}: any) => {
        adAPI.postAd({name: values.name, link: values.link})
        resetForm()
    }

    return (
        <div>
            <Formik
                initialValues={{ name: '', link: '' }}
                validate={validate}
                onSubmit={onSubmit}
            >
                {(formProps) => (

                    <Form>
                        <div style={{display: 'inline-flex', marginBottom: 20}}>
                            <div style={{marginRight: 20, display: 'inline-flex'}}>
                                <Field style={{border: formProps.touched.name && formProps.errors.name && '1px solid red'}} placeholder="Name" type="name" name="name"/>
                                <div style={{color: 'red'}}>
                                    <ErrorMessage name="name" component="div"/>
                                </div>
                            </div>
                           <div style={{marginRight: 20, display: 'inline-flex'}}>
                               <Field style={{border: formProps.touched.link && formProps.errors.link && '1px solid red'}} placeholder="Link"  type="link" name="link"/>
                               <div style={{color: 'red'}}>
                                   <ErrorMessage name="link" component="div"/>
                               </div>
                           </div>
                        </div>
                        <button style={{cursor: 'pointer'}} type="submit">
                            Add
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default AdForm;