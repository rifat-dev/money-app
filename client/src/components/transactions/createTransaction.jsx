import { Component } from 'react';
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {addNewTransaction} from '../../store/actions/transactionsAction'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '500px'
    }
  };



class CreateTransaction extends Component {
    state = {
        amount: 0,
        type: '',
        note: ''
    }

    changeHandaler = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    submitHandelar = e =>{
        e.preventDefault()
        this.props.addNewTransaction(this.state)
        this.setState({
            amount: 0,
            type: '',
            note: ''
        })
    }


    render() {
        let { amount, note} = this.state
        return (
            <div>
                <Modal
                 isOpen={this.props.isOpen}
                 onRequestClose={this.props.close}
                 style={customStyles}
                  >
                    <form onSubmit={this.submitHandelar}>
                        <div className="form-group">
                            <label htmlFor="type">Transaction Type</label>
                            <select
                                className="form-control"
                                id="type"
                                onChange={this.changeHandaler}
                                name="type"
                            >
                                <option>Select A Type</option>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount: </label>
                            <input onChange={this.changeHandaler} type="number" name="amount" className="form-control" id="amount" value={amount} placeholder="Amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note">Short Note</label>
                            <textarea onChange={this.changeHandaler} className="form-control" name="note" value={note} id="note"></textarea>
                        </div>
                        <input type="submit" className="btn btn-success" value="Create Transaction"/>
                        <input type="submit" onClick={this.props.close} className="btn btn-warning ml-2" value="Close" />
                    </form>
                </Modal>
            </div>
        );
    }
}

export default connect(null,{addNewTransaction})(CreateTransaction);
