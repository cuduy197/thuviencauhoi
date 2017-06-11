/*eslint-disable */
import React from 'react';
import { Menu, Icon, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MediaQuery = require('react-responsive');

export default class NavBar extends React.Component {
    /*
    		 _______.___________.    ___   .___________. _______ 
    		/       |           |   /   \  |           ||   ____|
    	 |   (----`---|  |----`  /  ^  \ `---|  |----`|  |__   
    		\   \       |  |      /  /_\  \    |  |     |   __|  
    .----)   |      |  |     /  _____  \   |  |     |  |____ 
    |_______/       |__|    /__/     \__\  |__|     |_______|
    																												 */

    state = {
        current: 'mail',
        menu: ["Toán học", "Tiếng Anh", "Ngữ Văn", "Vật lý", "Hóa học", "Sinh học", "Lịch Sử", "Địa lý"]
    }

    /*
 _______  __    __  .__   __.   ______ .___________. __    ______   .__   __. 
|   ____||  |  |  | |  \ |  |  /      ||           ||  |  /  __  \  |  \ |  | 
|  |__   |  |  |  | |   \|  | |  ,----'`---|  |----`|  | |  |  |  | |   \|  | 
|   __|  |  |  |  | |  . `  | |  |         |  |     |  | |  |  |  | |  . `  | 
|  |     |  `--'  | |  |\   | |  `----.    |  |     |  | |  `--'  | |  |\   | 
|__|      \______/  |__| \__|  \______|    |__|     |__|  \______/  |__| \__| 
																																							*/
    handleClick = (e) => {
            //console.log('click ', e);
            this.setState({
                current: e.key,
            });
        }
        /*
        .______       _______ .__   __.  _______   _______ .______      
        |   _  \     |   ____||  \ |  | |       \ |   ____||   _  \     
        |  |_)  |    |  |__   |   \|  | |  .--.  ||  |__   |  |_)  |    
        |      /     |   __|  |  . `  | |  |  |  ||   __|  |      /     
        |  |\  \----.|  |____ |  |\   | |  '--'  ||  |____ |  |\  \----.
        | _| `._____||_______||__| \__| |_______/ |_______|| _| `._____|
        																																*/
    render() {

        const NavMobile =
            <Menu onClick={this.handleClick}
				       
				mode="horizontal">
				<Menu.Item key="homepage">
					<Link to="/">Trang chủ <Icon type="home" /></Link>
				</Menu.Item>
			  <Menu.Item key="guide">
					<Link to="/huongdan">Hướng dẫn <Icon type="question-circle-o" /></Link>
        </Menu.Item>
				{/*<SubMenu title={<span><Icon type="appstore" />Môn học</span>} style={{ float: 'left' }}>
					{this.state.menu.map(n =>
						<Menu.Item key={n}>
							<Link to="/">{n}</Link>
						</Menu.Item>)}
				</SubMenu>*/}
			</Menu>;

        const NavDecktop =
            (
                /*<Menu onClick={this.handleClick}
					theme=""
					style={{  }}
					mode="horizontal">
					<Menu.Item style={{ float: 'left' }} key="homepage">
						<a href="/"><Icon type="home" /> Trang chủ</a>
					</Menu.Item>
	
					{this.state.menu.map(n =>
						<Menu.Item style={{ float: 'right' }} key={n}>
							<a href="/">{n}</a>
						</Menu.Item>)}
				</Menu>*/

                <Menu
					onClick={this.handleClick}
					style={{ width: 200, float: '' }}
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					mode="vertical"
				>
					<SubMenu key="sub1" title={<span><Icon type="config" /><span>Môn học</span></span>}>

						{this.state.menu.map(n =>
							<Menu.Item key={n}>
								<a href="/">{n}</a>
							</Menu.Item>)}

					</SubMenu>
				</Menu>

            );

        return (
            <div>
				{NavMobile}
			</div>
        );
    }
}
