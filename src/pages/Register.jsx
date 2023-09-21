import { useState } from "react"
import http from "../http"
import { useNavigate } from "react-router-dom"
import { SubmitBtn } from "../components"
import { Form } from "react-bootstrap"
import { setInForm } from "../lib"
import { FormItem } from "../components/FormItem"

export const Register = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()

        setLoading(true)

        http.post('register', form)
            .then(() => navigate('/login'))
            .catch(err = {})
            .finally(() => setLoading(false))
    }

    return <div className="col-12">
        {/* Main Content */}
        <div className="row">
            <div className="col-12 mt-3 text-center text-uppercase">
                <h2>Register</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
                <div className="row">
                    <div className="col-12">
                        <Form onSubmit={handleSubmit}>
                            <FormItem title="Name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="Email" label="email">
                                <Form.Control type="email" name="email" id="email" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="New Password" label="password">
                                <Form.Control type="password" name="password" id="password" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="Confirm Password" label="confirm_password">
                                <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>


                            <FormItem title="Phone" label="Phone">
                                <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="Address" label="Address">
                                <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <div className="form-check">
                                <input type="checkbox" id="agree" className="form-check-input" required />
                                <label htmlFor="agree" className="form-check-label ml-2">I agree to Terms and Conditions</label>
                            </div>
                    <div className="form-group">
                        <SubmitBtn loading={loading} icon="fa-user-plus" label="Register" />
                    </div>
                </Form>
            </div>
        </div>
        </div >
        </div>
        </div>
}