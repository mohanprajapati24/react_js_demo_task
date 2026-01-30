import React, { useState } from 'react';
import './FormValidation.css';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormValidation = () => {

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Name must be at least 3 characters long")
            .max(20, "Name must be at most 20 characters long")
            .required("Name is Required"),
        email: Yup.string().email("Invalid email").required("Email is Required"),
        password: Yup.string().required("Password is Required")
    })

    return (
        <div className="form-container">
            <div className="glass-card">
                <h2>Create Account</h2>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={formSchema}
                    onSubmit={
                        (values) => {
                            console.log(`-----Values----`, values)
                        }
                    }
                >
                    {({ errors, touched }) =>
                    (
                        <Form>
                            <div className="form-group">
                                <label className="label-text" htmlFor="name">Full Name</label>
                                <div className="input-wrapper">
                                    <User className="input-icon" size={20} />
                                    <Field
                                        className={`form-input ${touched.name && errors.name ? 'error' : ''}`}
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <ErrorMessage name="name" component="div" className="error-text" />

                            </div>

                            <div className="form-group">
                                <label className="label-text" htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <Field
                                        className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className="error-text" />

                            </div>

                            <div className="form-group">
                                <label className="label-text" htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={20} />
                                    <Field
                                        className={`form-input ${touched.password && errors.password ? 'error' : ''}`}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className="error-text" />

                            </div>

                            <button type="submit" className="submit-btn">Sign Up</button>
                        </Form>

                    )}

                </Formik>
            </div>
        </div >
    );
};

export default FormValidation;