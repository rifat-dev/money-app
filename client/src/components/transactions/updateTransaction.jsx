import { Component } from 'react';
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {updateTransaction} from '../../store/actions/transactionsAction'

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



class UpdateTransaction extends Component {
    state = {
        amount: 0,
        note: ''
    }

    componentDidMount(){
       this.setState({
           amount: this.props.transaction.amount,
           note: this.props.transaction.note
       })
    }

    changeHandaler = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    submitHandelar = e =>{
        e.preventDefault()
        this.props.updateTransaction(this.props.transaction._id, this.state)
        this.props.close()
    
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
                    <h2>Update Transaction</h2>
                    <form onSubmit={this.submitHandelar}>
                        <div className="form-group">
                            <label htmlFor="type">Transaction Type</label>
                             <input className="form-control" type="text" disabled id="type" value={this.props.transaction.type} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount: </label>
                            <input onChange={this.changeHandaler} type="number" name="amount" className="form-control" id="amount" value={amount} placeholder="Amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note">Short Note</label>
                            <textarea onChange={this.changeHandaler} className="form-control" name="note" value={note} id="note"></textarea>
                        </div>
                        <input type="submit" className="btn btn-success" value="Update"/>
                        <input type="submit" onClick={this.props.close} className="btn btn-warning ml-2" value="Close" />
                    </form>
                </Modal>
            </div>
        );
    }
}

export default connect(null,{updateTransaction})(UpdateTransaction);
