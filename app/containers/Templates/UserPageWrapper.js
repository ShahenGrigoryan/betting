/* eslint-disable indent */
import React, {useState, useEffect, Fragment} from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import { GuideSlider } from 'dan-components';
import dataMenu from 'dan-api/ui/menu';
import UserBg from "../../api/ui/images/userBg.png"
import UserIcon from "../../api/ui/images/UserIcon.svg";
import ReferalIcon from "../../api/ui/images/ReferalIcon.svg";
import ControlIcon from "../../api/ui/images/ControlIcon.svg"

import {
    toggleAction,
    openAction,
    playTransitionAction
} from 'dan-redux/actions/uiActions';
import LeftSidebarLayout from './layouts/LeftSidebarLayout';
import RightSidebarLayout from './layouts/RightSidebarLayout';
import LeftSidebarBigLayout from './layouts/LeftSidebarBigLayout';
import DropMenuLayout from './layouts/DropMenuLayout';
import MegaMenuLayout from './layouts/MegaMenuLayout';
import styles from './appStyles-jss';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header/Header";
import {Box, Button, Typography} from "@material-ui/core";
import UserHeader from "../../components/UserHeader/Header";
import InfoTitle from "../../components/UserHeader/InfoTitle";
import InfoRow from "../../components/UserHeader/InfoRow";
import * as Actions from "../../redux/admin/admin.actions"
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    headerButton:{
        background: "#24BD53",
        boxShadow: '0px 4px 20px rgba(36, 189, 83, 0.79)',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '25px',
        lineHeight: '30px',
        color: '#FFFFFF',
        width:'27.18vw',
        height:'102px',
        textDecoration:'none',
        "&:hover":{
            backgroundColor: '#49d072'
        }
    },
    buttonBox:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        flex:'1',
        "& a":{
            textDecoration:'none'
        }

    },
    infoBox:{
        padding:'49px 11%',
        backgroundColor:'#fff',
        boxShadow: '0px 4px 20px rgba(60, 209, 132, 0.2)',
        borderRadius: '35px',
        marginLeft:'89px',
        height:'auto',
        width:'50.6vw'
    },
    infoSide:{
        maxWidth:'50%'
    },
    bottomInfoSide:{
        width:'auto',
        maxWidth:'500px'
    }


})

function UserPageWrapper(props) {
    // Initial header style
    const [openGuide, setOpenGuide] = useState(false);
    const [appHeight, setAppHeight] = useState(0);
    const styles = useStyles();
    const {
        classes,
        children,
        toggleDrawer,
        sidebarOpen,
        loadTransition,
        pageLoaded,
        mode,
        history,
        gradient,
        userPass,
        deco,
        bgPosition,
        layout,
        userInfo,
        token,
        changeMode,
        getUserInfo
    } = props;
    useEffect(() => {
        const { history, loadTransition } = props;

        // Adjust min height
        setAppHeight(window.innerHeight + 112);

        // Set expanded sidebar menu
        const currentPath = history.location.pathname;
        props.initialOpen(currentPath);
        // Play page transition
        loadTransition(true);

        // Execute all arguments when page changes
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
            setTimeout(() => {
                loadTransition(true);
            }, 300);
        });

       getUserInfo((Actions.getInfoStart(token)))

        return () => {
            if (unlisten != null) {
                unlisten();
            }
        };
    }, []);

    const handleOpenGuide = () => {
        setOpenGuide(true);
    };

    const handleCloseGuide = () => {
        setOpenGuide(false);
    };



    const parts = history.location.pathname.split('/');
    const place = parts[parts.length - 1].replace('-', ' ');
    return (
        <div
            style={{ minHeight: appHeight }}

        >

            <Sidebar
                open={sidebarOpen}
                toggleDrawerOpen={toggleDrawer}
                loadTransition={loadTransition}
                dataMenu={dataMenu}
                leftSidebar
            />
            <Box style={{backgroundImage:`url(${UserBg})`,height:'700px',backgroundSize:'contain',fontFamily:"'Montserrat', sans-serif"}}>
                <UserHeader
                    toggleDrawerOpen={toggleDrawer}
                    margin={sidebarOpen}
                    gradient={gradient}
                    position="left-sidebar"
                    changeMode={changeMode}
                    mode={mode}
                    title={place}
                    history={history}
                    openGuide={handleOpenGuide}
                />
                <Box padding={"80px 3.56% 0 10%"} display={"flex"}>
                    <Box className={styles.buttonBox}>
                        <a href={"http://download.bettingco.ru/public/Betting%20Co%20Installer.exe"} target={"_blank"}>
                <Button style={{marginBottom:'30px'}} className={styles.headerButton}>
                    Скачать бота
                </Button>
                        </a>
                        <a target={"_blank"} href={"http://download.bettingco.ru/public/Betting%20Co.%20%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F%2009.20.pdf"}>

                <Button className={styles.headerButton}>Скачать мануал
                </Button>
                        </a>
                    </Box>
                    <Box>
                    <Box className={styles.infoBox}>
                        <Typography variant={"h6"} style={{marginBottom: '28px'}}>Профиль пользователя</Typography>
                        <Box display={"flex"} justifyContent={"space-between"} style={{paddingBottom:'35px', borderBottom:' 1px solid rgba(0, 0, 0, 0.6)'}}>
                        <Box className={styles.infoSide}>
                            <InfoTitle title={"Информация о пользователе"} icon={UserIcon}/>
                            <Box style={{paddingRight: '40px'}}>
                            <InfoRow left={"Логин"} right={userInfo?userInfo.userName:"_"}/>
                            <InfoRow left={"Почта"} right={userInfo?userInfo.email:'_'}/>
                            <InfoRow left={"Пароль"} password color={"#000"} right={userPass}/>
                            </Box>
                        </Box>
                        <Box className={styles.infoSide}>
                                <InfoTitle title={"Реферальная система"} icon={ReferalIcon}/>
                                <Box style={{paddingRight: '40px'}}>
                                    <InfoRow left={"Мой промокод"} right={userInfo?userInfo.myReferalCode:'b16bb6'} color={'#C4C4C4'} textDecoration={'underline'}/>
                                    <InfoRow left={"Рефералов"} color={"#000"} right={userInfo?userInfo.referalsCount:'0'}/>
                                    <InfoRow left={"На выплату"} color={"#000"} right={userInfo?userInfo.myReferalUnpaidBalance+' р':'0 р'}/>
                                </Box>
                            </Box>
                        </Box>

                        <Box className={styles.bottomInfoSide} style={{paddingTop:'35px'}}>
                            <InfoTitle title={"Панель управления"} icon={ControlIcon}/>
                            <Box>

                                <InfoRow left={"Ключ"} right={userInfo?userInfo.key:'1 1 1'}/>
                                <InfoRow left={"Подписка"}  right={userInfo?userInfo.expirationDate:'04.11.2032      07:52:26'}/>
                                <InfoRow left={"Кол-во возможных заморозок:"}  color={"#000"} right={userInfo?userInfo.sleepCount:'0'}/>

                            </Box>
                        </Box>
                    </Box>
                    </Box>
                </Box>
            </Box>

            {children}

        </div>
    );
}

UserPageWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
    initialOpen: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    loadTransition: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    pageLoaded: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    gradient: PropTypes.bool.isRequired,
    deco: PropTypes.bool.isRequired,
    bgPosition: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

const reducer = 'ui';
const mapStateToProps = state => ({
    sidebarOpen: state.getIn([reducer, 'sidebarOpen']),
    pageLoaded: state.getIn([reducer, 'pageLoaded']),
    mode: state.getIn([reducer, 'type']),
    gradient: state.getIn([reducer, 'gradient']),
    deco: state.getIn([reducer, 'decoration']),
    token:state.get('admin').user.token,
    userInfo:state.get('admin').userInfo,
    userPass:state.get('admin').userPass,
    layout: state.getIn([reducer, 'layout']),
    bgPosition: state.getIn([reducer, 'bgPosition']),
    ...state
});
const mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch(toggleAction),
    getUserInfo:dispatch,
    initialOpen: bindActionCreators(openAction, dispatch),
    loadTransition: bindActionCreators(playTransitionAction, dispatch),

});

const UserPageWrapperMaped = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPageWrapper);

export default withStyles(styles)(UserPageWrapperMaped);
