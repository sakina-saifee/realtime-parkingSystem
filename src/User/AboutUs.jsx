import React from 'react';
import '../Footer.css';
import AboutPic from '../Assets/aboutUsPic.jpg';
import Navbar2 from '../Navbar2';
import Footer from '../Footer';

const AboutUs = () => {
  return (
   <>
      <Navbar2/>
  <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Parking Lot System</h1>
       </div>
    </div> 
    <div className='About-Header'>
     <h1> About Us</h1>
    </div>

    <div className='AboutSection'>

<div className='inner-about-section'>
<div className='img-about'>
            <img src={AboutPic} width="500" height="350"/>
        </div>

        <div className='aboutSectionText'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem deleniti in dicta, enim incidunt tempora neque minima, non fuga fugit reiciendis eum voluptate sint qui doloremque provident? Eius placeat sequi deleniti. Dicta tenetur illum labore? Quia placeat assumenda, hic iusto odit magnam aspernatur qui perspiciatis maxime tenetur optio tempora consectetur reprehenderit officiis doloremque eligendi facilis fugit totam. Recusandae quam expedita unde explicabo accusantium est beatae eius porro nostrum dolore exercitationem distinctio, esse quibusdam hic repellendus quidem atque incidunt laborum mollitia blanditiis molestiae deleniti reprehenderit iure cumque. Consectetur tempore eius nobis cumque? Illum veniam expedita odit. Beatae, earum tempore ex quaerat repellat labore, illo laborum atque at eaque voluptates aut sequi eligendi debitis excepturi voluptatem iste. Qui blanditiis perspiciatis tenetur officia distinctio tempore ullam nesciunt maiores suscipit fugit voluptatum debitis eaque amet, reiciendis doloribus voluptatem itaque aperiam tempora id porro ducimus! Molestiae, iusto beatae nulla ab, accusamus odit quaerat consequuntur neque fugiat dignissimos id architecto iste omnis illo quos? Reiciendis quaerat debitis officia nostrum mollitia? Aspernatur quae architecto quibusdam voluptate. Laborum explicabo possimus nobis odit voluptatum ipsam consequuntur dolorum, soluta eveniet, quisquam veritatis voluptas, ab non minus architecto facere natus blanditiis. Blanditiis accusantium deleniti maxime eos quod fugiat vitae esse laborum?</p>

        </div>
</div>
     

    </div>
    <Footer/>

   </>
  )
}

export default AboutUs
