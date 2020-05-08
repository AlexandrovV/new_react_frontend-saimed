import React, {Fragment, useState} from 'react'
import Navbar from './Navbar'
import HeadingSection from './HeadingSection'
import ServicesSection from './ServicesSection'
import OnlineAppointmentsSection from './OnlineAppointmentsSection'
import TeamSection from './TeamSection'
import ContactsSection from './ContactsSection'
import CopyrightSection from './CopyrightSection'
import LoginModal from './LoginModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import '../../backimg.css'
import RegisterModal from './RegisterModal'
import InstagramSection from './InstagramSection';


const Landing = props => {  

    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [registerModalOpen, setRegisterModalOpen] = useState(false)
    const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false)

    const openLoginModal = () => setLoginModalOpen(true)
    const closeLoginModal = () => setLoginModalOpen(false)
    const openRegisterModal = () => setRegisterModalOpen(true)
    const closeRegisterModal = () => setRegisterModalOpen(false)
    const openForgotPasswordModal = () => setForgotPasswordModalOpen(true)
    const closeForgotPasswordModal = () => setForgotPasswordModalOpen(false)

    return (
        <Fragment >
            <Navbar openLoginModal={openLoginModal}/>
            <HeadingSection openLoginModal={openLoginModal}/>
            <div className="full_bg">
                <ServicesSection /> 
                <OnlineAppointmentsSection openLoginModal={openLoginModal}/>
                <TeamSection />
                <InstagramSection/>
                <ContactsSection />
                <CopyrightSection /> 
            </div>
             <LoginModal open={loginModalOpen} onClose={closeLoginModal} openRegisterModal={openRegisterModal} openForgotPasswordModal={openForgotPasswordModal} />
             <RegisterModal open={registerModalOpen} onClose={closeRegisterModal}/>
             <ForgotPasswordModal open={forgotPasswordModalOpen} onClose={closeForgotPasswordModal} openLoginModal={openLoginModal}/>
        </Fragment>

    )
}

export default Landing