import profile from './profile.jpg'

function Navbar() {

    return (
        <>
            <nav>
                <img src={profile} alt="" />
               <section>
               <b>@Beka</b>
               <p id="curso">Publicidade</p>
               </section>
            </nav>
        </>
    )
}

export default Navbar
