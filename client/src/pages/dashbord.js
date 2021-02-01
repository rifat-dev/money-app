import { Component } from 'react';
import { connect } from 'react-redux'
import { loadTransactions, removeTransaction } from '../store/actions/transactionsAction'
import CreateTransaction from '../components/transactions/createTransaction'
import UpdateTransaction from '../components/transactions/updateTransaction'

class Dashbord extends Component {

    state = {
        isOpen: false,
        id: ''
    }

    openModal = () => {
        this.setState({
            isOpen: true,
        })
    }

    openUpdateModal = (id) => {
        this.setState({
            isOpen: true,
            id
        })
    }

    closeModal = () => {
        this.setState({
            isOpen: false,
            id: ''
        })
    }


    componentDidMount() {
        this.props.loadTransactions()
    }

   

    render() {
        let { auth, transactions } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">

                        <h1>Welcome {auth.user.name}</h1>
                        <h4>Email :{auth.user.email}</h4>
                        <button onClick={this.openModal} className="btn btn-primary my-3">
                            CreateTransaction
                        </button>
                        <CreateTransaction
                            isOpen={this.state.isOpen}
                            close={this.closeModal}
                        />


                        <h3>Transactions : </h3>
                        <ul className="list-group">
                            {
                                transactions.length !== 0 ?
                                transactions.map(transaction => (
                                    <li className="list-group-item" key={transaction._id} >
                                        <h3>Type : {transaction.type}</h3>
                                        <h6>Amount : {transaction.amount}</h6>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.props.removeTransaction(transaction._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-success mx-2"
                                            onClick={() => this.openUpdateModal(transaction._id)}
                                        >
                                            Update
                                        </button>
                                        {transaction._id === this.state.id ? <UpdateTransaction
                                            isOpen={this.state.isOpen}
                                            close={this.closeModal}
                                            transaction={transaction}
                                        /> : null}
                                    </li>
                                )):
                                <h3>There Is No Transactions.</h3>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions, removeTransaction })(Dashbord);
