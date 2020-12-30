import { Component, Fragment } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'


class Nav extends Component {
    render() {
        let { auth } = this.props
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" ><span class="navbar-brand" >Money App</span></Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <NavLink className="nav-link" to="/" >Home</NavLink>
                        </li>
                        {
                            auth.isAuthenticated ?
                                <Fragment>
                                    <li class="nav-item active">
                                        <NavLink className="nav-link" to="/dashbord" >Dashbord</NavLink>
                                    </li>
                                    <li class="nav-item active">
                                        <NavLink
                                         className="nav-link" 
                                         to="/login"
                                         onClick={()=>this.props.logout(this.props.history)}
                                          >
                                            Logout
                                            </NavLink>
                                    </li>
                                </Fragment>
                                :
                                <Fragment>
                                    <li class="nav-item active">
                                        <NavLink className="nav-link" to="/login" >LogIn</NavLink>
                                    </li>
                                    <li class="nav-item active">
                                        <NavLink className="nav-link" to="/register" >Register</NavLink>
                                    </li>
                                </Fragment>

                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(withRouter(Nav))