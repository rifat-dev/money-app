import { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../store/actions/authActions'


class LogIn extends Component {
    state = {
        email: '',
        password: '',
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

        this.props.login({
            email:this.state.email,
            password:this.state.password
        },this.props.history)

    }



    render() {
        let {email, password, error } = this.state
        return (
            <div className='row mt-5'>
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">LogIn Form</h5>
                            <form onSubmit={this.submitHandelar}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input onChange={this.changeHandelar} name="email" type="email" className={error.email ? 'form-control is-invalid':'form-control'} id="exampleInputEmail1" value={email} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    <div className="invalid-feedback">
                                       {error.email}
                                  </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input onChange={this.changeHandelar} name="password" type="password" className={error.password ? 'form-control is-invalid':'form-control'} id="exampleInputPassword1" value={password} />
                                    <div className="invalid-feedback">
                                        {error.password}
                                    </div>
                                </div>
                                <Link to={'/register'}><span className="my-3" >Dont Have An Account? Register Here</span></Link>
                                <button className="btn btn-primary d-block mt-2">SignIn</button>
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

export default connect(mapStateToProps,{login})(LogIn);