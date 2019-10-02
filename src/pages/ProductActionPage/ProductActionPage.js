import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index'
import { connect } from 'react-redux'

class ProductActionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            cbStatus: ''
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value
        this.setState({
            [name]: value
        })
    }

    onSave = (event) => {
        event.preventDefault();
        let { id, txtName, txtPrice, cbStatus } = this.state
        let { history } = this.props
        let product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: cbStatus
        }
        if (id !== '') {
            this.props.onUpdateProduct(product);
            history.goBack()
        }
        else {
            this.props.onAddProduct(product);
            history.goBack()
        }
    }

    componentDidMount() {
        let { match } = this.props
        if (match) {
            let id = match.params.id
            this.props.onEditProduct(id)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            let { itemEditing } = nextProps
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                cbStatus: itemEditing.status
            })
        }
    }

    render() {
        let { txtName, txtPrice, cbStatus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên sản phẩm: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange} />
                    </div>
                    <div className="checkbox">
                        <label><input
                            type="checkbox"
                            name="cbStatus"
                            value={cbStatus}
                            onChange={this.onChange}
                            checked={cbStatus}
                        /> Còn hàng </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Lưu lại</button>
                    <Link to="/product-list" className="btn btn-warning ml-10">
                        Trở lại
                    </Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);