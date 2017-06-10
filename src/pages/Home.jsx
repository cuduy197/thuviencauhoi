import React, { Component } from 'react';
import { login, logout } from '../redux/actions/user';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button, Spin, Icon } from 'antd';

class Home extends Component {

    render() {

        let islogin = this.props.islogin;
        let userData = this.props.userData;
        let state = this.props; //{state.match.params.id}
        const { location /*,{location.pathname}  match, history*/ } = this.props;

        //HTML
        return (
            <div className="animated fadeIn">
        {islogin===null ?  <div style={{paddingTop : '5em'}}> <Spin tip="Đang tải dữ liệu..."> </Spin> </div> : 
				islogin ? 
				<div className='center'> 
				<h1>Chào mừng : <u style={{color: 'purple'}} >{userData.name} </u> </h1> 
				<h1>chúc bạn một ngày tốt lành <span style={{color: 'green'}} role="img" aria-label='lucky'>🍀</span></h1>
				<br />	<br />	<br />
				<h1>bạn muốn ... </h1>
				<br />
				<div > 
				<Link to='home' > <Button icon="edit" type="primary" >Tạo câu hỏi</Button>  </Link> <br/><br/>
				<Link to='home' > <Button icon="sync" type="primary" >Xem, cập nhật câu hỏi</Button>  </Link> <br/><br/>
				<Link to='home' > <Button icon="solution" type="primary">Thống kê</Button>  </Link>  <br/><br/><br/><br/>
				<Button  icon="disconnect"  onClick={()=> state.logout()}>Đăng xuất</Button>
				</div>
				</div>
				:
				 <div className='center'>
				  <h1  className='animated flipInX'>Chào mừng bạn đến Thư viện câu hỏi</h1>
				  <br />
				<Button type="primary" onClick={()=> state.login()}>Đăng nhập</Button>
				 </div>
				}
			</div>
        )
    }
}

export default withRouter(
    connect(
        state => ({
            state: state,
            userData: state.user.userData,
            islogin: state.user.islogin
        }), { login, logout }
    )(Home))
