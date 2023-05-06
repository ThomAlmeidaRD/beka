function Navbar() {

    let imgLink = 'https://i.pinimg.com/564x/41/59/8b/41598b79697b7e0fcd6f882a0920cd4f.jpg'

    return (
        <>
            <nav>
                <img src={imgLink} alt="" />
               <section>
               <b>@Beka</b>
               <p id="curso">Publicidade</p>
               </section>
            </nav>
        </>
    )
}

export default Navbar
