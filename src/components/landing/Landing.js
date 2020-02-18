import React, { Fragment, useState } from 'react'
import Navbar from './Navbar'
import HeadingSection from './HeadingSection'
import ServicesSection from './ServicesSection'
import OnlineAppointmentsSection from './OnlineAppointmentsSection'
import TeamSection from './TeamSection'
import ContactsSection from './ContactsSection'
import CopyrightSection from './CopyrightSection'
import LoginModal from './LoginModal'
import '../../backimg.css'
import RegisterModal from './RegisterModal'


const Landing = props => {  
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [registerModalOpen, setRegisterModalOpen] = useState(false)
    
    const openLoginModal = () => setLoginModalOpen(true)
    const closeLoginModal = () => setLoginModalOpen(false)
    const openRegisterModal = () => setRegisterModalOpen(true)
    const closeRegisterModal = () => setRegisterModalOpen(false)

    return (
        
        <Fragment >
            <Navbar openLoginModal={openLoginModal}/>
            <HeadingSection openLoginModal={openLoginModal}/>
            <div className="full_bg">
                <ServicesSection /> 
                <OnlineAppointmentsSection />
                <TeamSection />
                <ContactsSection />
                <CopyrightSection /> 
            </div>
             <LoginModal open={loginModalOpen} onClose={closeLoginModal} openRegisterModal={openRegisterModal} />
             <RegisterModal open={registerModalOpen} onClose={closeRegisterModal}/>
        </Fragment>

    )
}

export default Landing