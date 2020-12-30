import { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {register} from '../store/actions/authActions'



class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    }


    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
            }
        }

        return null
    }

    changeHandelar = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandelar = e => {
        e.preventDefault()
        let { name, email, password, confirmPassword } = this.state
        this.props.register({ name, email, password, confirmPassword }, this.props.history)
    }

    render() {
        let { name, email, password, confirmPassword, error } = this.state
        return (
            <div className='row mt-5'>
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Register Form</h5>
                            <form onSubmit={this.submitHandelar}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input onChange={this.changeHandelar} name="name" type="text" className={error.name ? 'form-control is-invalid' : 'form-control'} id="name" value={name} />
                                    {error.name && <div className="invalid-feedback">
                                        {error.name}
                                    </div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input onChange={this.changeHandelar} name="email" type="email" className={error.email ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" value={email} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    {error.email && <div className="invalid-feedback">
                                        {error.email}
                                    </div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input onChange={this.changeHandelar} name="password" type="password" className={error.password ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" value={password} />
                                    {error.password && <div className="invalid-feedback">
                                        {error.password}
                                    </div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPass">ConfirmPassword</label>
                                    <input onChange={this.changeHandelar} name="confirmPassword" type="password" className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'} id="confirmPass" value={confirmPassword} />
                                    {error.confirmPassword && <div className="invalid-feedback">
                                        {error.confirmPassword}
                                    </div>}
                                </div>
                                <Link to={'/login'}><span className="my-3">Already Have An Account? LogIn</span></Link>
                                <button className="btn btn-primary d-block mt-2">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { register })(Register);